
import React, { useState, useEffect } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import $ from 'jquery';
import './navbar.scss';
import '../packs/requests';
import '../packs/utils';
import { getCurrentUser } from '../packs/utils';
import { logOutUser } from '../packs/requests';




export const NavBar = props => {


    const [currentUser, setCurrentUser] = useState("");

    const logOutHandler = function () {
        logOutUser(function (response) {
            if (response.success == true) {
                window.location.replace('/');
            };
        });
    };

    const navigateToFeed = function () {
        window.location.replace('/feed');
    }

    useEffect(() => {
        getCurrentUser(function (response) {
            setCurrentUser(response.username);;
        })
    }, []);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="d-flex align-items-center">
                <img id="twitter-logo" className="mx-3 mb-4 navbar-brand align-self-center" src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" />
            </div>
            <div className="navbar-nav px-2">
                <ul id="nav-content" className="d-flex flex-row justify-content-end mx-2">
                    <li className="nav-item active mx-3">
                        <a href={"/" + currentUser}>{currentUser}</a>
                    </li>
                    <li className="nav-item active mx-3">
                        <a href={"/feed"}>Feed</a>
                    </li>
                    <li className="nav-item active ">
                        <button className="btn-sm btn-primary" onClick={logOutHandler}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav >



    );
}