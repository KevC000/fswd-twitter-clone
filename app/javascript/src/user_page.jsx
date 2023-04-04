import React, { useState, useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import $ from 'jquery';
import './user_page.scss';
import '../packs/requests'
import '../packs/utils'
import './navbar'
import { NavBar } from './navbar';
import { deleteTweet, getTweets, getUsersTweets, postTweet } from '../packs/requests';
import { countUsersTweets, getCurrentUser, getcountUsersTweets } from '../packs/utils';
import { func } from 'prop-types';



const UserPage = props => {

    const [pageUser, setPageUser] = useState(window.location.pathname.slice(1));
    const [userTweets, setUserTweets] = useState([]);

    const getPageUser = function () {
        setPageUser()
    }

    useEffect(() => {
        getUsersTweets(pageUser, function (response) {
            setUserTweets(response.tweets.map(tweet => tweet));
        });
    }, []);

    return (<div className="container-fullwidth">
        <div className="row d-flex justify-content-center">
            <NavBar />
            <div id="content" className="col-sm-12 col-lg-10 bg-light my-3">
                <h3>{pageUser}'s Tweets</h3>
                <div id="tweets">
                    {userTweets.map(tweet => {
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
                    })}
                </div>
            </div>
        </div>
    </div >
    )
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    const root = ReactDOMClient.createRoot(container);
    root.render(
        <UserPage />
    );
})
