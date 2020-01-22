import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./Start.css";

require("dotenv").config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

class Start extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
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

// <GoogleLogout
//             clientId={GOOGLE_CLIENT_ID}
//             buttonText="Logout"
//             onLogoutSuccess={this.props.handleLogout}
//             onFailure={(err) => console.log(err)}
//           />
