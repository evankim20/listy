import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { navigate } from "@reach/router";


import "../../utilities.css";
import "./Start.css";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

/**
 * Home page that user is prompted on first time entering page
 *
 * Proptypes
 * @param {string} userId of current user
 * @param {function} handleLogin handles login functionality and changing state
 */
class Start extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  render() {
    if (this.props.userId) {
      navigate("/feed/landing");
    }
    return (
      <div id="start-container">
        <div className="start-content-container">
        <h1 id="start-title u-headerFont">listy</h1>
        <ul id="title-list-container">
          <li className="title-list-item">Make collaborative lists</li>
          <li className="title-list-item">Share with friends</li>
          <li className="title-list-item">Vote on items</li>
          <li className="title-list-item">Discover and contribute</li>
        </ul>
        <p>Login to get started</p>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.props.handleLogin}
          onFailure={(err) => console.log(err)}
          id="start-loginbtn"
        />
        </div>
      </div>
    );
  }
}

export default Start;