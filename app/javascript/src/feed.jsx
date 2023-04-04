import React, { useState, useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import $ from 'jquery';
import './feed.scss';
import '../packs/requests'
import '../packs/utils'
import './navbar'
import { NavBar } from './navbar';
import { deleteTweet, getTweets, postTweet } from '../packs/requests';
import { countUsersTweets, getCurrentUser, getcountUsersTweets } from '../packs/utils';

const Feed = props => {

    const [tweets, setTweets] = useState([]);
    const [newTweet, setNewTweet] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [characters, setCharacters] = useState(140);
    const [tweetCount, setTweetCount] = useState(0);
    const [imagePreview, setImagePreview] = useState("");

    //    map tweets to state

    const listOfTweets = function (response) {
        setTweets(response.tweets.map(tweet => tweet));
    };

    //    handlers 

    const postTweetHandler = function (event) {
        event.preventDefault();
        var photo = null
        postTweet(newTweet, photo, function (response) {
            if (response.success == false) {
                setErrorMessage("Sorry, there was an error posting your tweet. Please try again");
            }
            else {
                setErrorMessage("");
                setImagePreview("");
                getTweets(listOfTweets);
                setNewTweet("");
                setCharacters(140);
                countUsersTweets(response.tweet.username, setTweetCount);
            }
        });
    };

    const imageHandler = function (event) {
        var source = URL.createObjectURL(event.target.files[0]);
        setImagePreview(source);
    };

    const tweetInputHandler = function (event) {
        setNewTweet(event.target.value);
        setCharacters(140 - event.target.value.length);
    };

    const deleteTweetHandler = function (event) {
        var id = event.target.dataset.id;
        deleteTweet(id, function () {
            getTweets(listOfTweets);
            countUsersTweets(currentUser, setTweetCount);
        });
    };

    //   get tweets on page load

    useEffect(() => {
        getCurrentUser(function (response) {
            setCurrentUser(response.username);
            countUsersTweets(response.username, setTweetCount);
        });
        getTweets(listOfTweets);
    }, []);


    return (<div className="container-fullwidth">

        <div className="row d-flex justify-content-center">
            <NavBar />
            <div id="content" className="col-sm-12 col-lg-10 bg-light my-3">
                <textarea id="new-tweet" className="form-control my-4" rows="3" value={newTweet} onChange={tweetInputHandler} />
                <button className="btn-sm btn-primary my-2" onClick={postTweetHandler}>Post</button>
                <h3 className="my-3">Latest</h3>
                <div id="feed" >
                    {tweets.map(tweet => {
                        if (tweet.username === currentUser) {
                            return (
                                <div className="tweet p-3 pb-0" key={tweet.id}>
                                    <p className="fw-bold d-inline">{tweet.username}</p>
                                    <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                                    <p className="d-inline date ps-1">{tweet.created_at}</p>
                                    <p className="pt-3 fw-light">{tweet.message}</p>
                                    <div className="img-wrapper px-md-4">
                                        <img className="pb-1 tweet-image" src={tweet.image}></img>
                                    </div>
                                    <button className="btn btn-sm d-flex ms-auto delete-btn" data-id={tweet.id} onClick={deleteTweetHandler}>Delete</button>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="tweet pb-4 p-3" key={tweet.id}>
                                    <p className="fw-bold d-inline">{tweet.username}</p>
                                    <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                                    <p className="d-inline date ps-1">{tweet.created_at}</p>
                                    <p className="pt-3 fw-light">{tweet.message}</p>
                                    <div className="img-wrapper px-md-4">
                                        <img className="pb-1 tweet-image" src={tweet.image}></img>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div >
    </div>);
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = ReactDOMClient.createRoot(container);
    root.render(
        <Feed />
    );
})
