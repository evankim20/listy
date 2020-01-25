import React, { Component } from "react";
import GoogleLogin, {  } from "react-google-login";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Start.css";

require("dotenv").config();

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
      <div>
        <h1>listy</h1>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={this.props.handleLogin}
          onFailure={(err) => console.log(err)}
        />
      </div>
    );
  }
}

export default Start;