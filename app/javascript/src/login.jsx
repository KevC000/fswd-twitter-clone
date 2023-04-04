import React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import $ from 'jquery';
import './login.scss';
import '../packs/requests'
import { createUser, logInUser, authenticateUser } from '../packs/requests';



const Login = props => {

  var login = (e) => {
    e.preventDefault();
    const username = $('#username-input').val();
    const password = $('#password-input').val();
    logInUser(username, password, function (response) {
      if (response.success == true) {
        window.location.assign('/feed');
      }
      else {
        setLogInMessage("Error logging in. Please try again")
      }
    });
  }

  var signup = (e) => {
    e.preventDefault();
    console.log('signup function runs');
    const username = $('#username-input').val();
    const email = $('#email-input').val();
    const password = $('#password-input').val();
    console.log(`user: ${username} email:${email} password:${password}`)
    createUser(username, email, password, function (response) {
      if (response.success == false) {
        alert(response.error);
      }
      else {
        alert("Success! Please log in");
        $('#username-input').val('');
        $('#email-input').val('');
        $('#password-input').val('');
      }
    });
  }

  return (<div className="container d-flex justify-content-center d-flex align-items-center">
    <form id="login-form" className=" col-xs-10 col-md-8 text-center rounded">
      <div className="form-group">
        <h3>Login/Signup</h3>
        <label >Username</label>
        <input className="form-control" id="username-input" placeholder="Enter Username" required />
      </div>
      <div className="form-group">
        <label >Email</label>
        <input className="form-control" id="email-input" type="Email" placeholder="Enter Email If you Signing Up" />
      </div>
      <div className="form-group">
        <label >Password</label>
        <input type="password" className="form-control" id="password-input" placeholder="Password" required />
      </div>
      <button id="login" onClick={login} className="mx-2 btn btn-primary">Login</button>
      <button id="signup" onClick={signup} className="mx-2 btn btn-primary">Signup</button>
    </form>
  </div >)
}



document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  const root = ReactDOMClient.createRoot(container);
  root.render(
    <Login />
  );
})
