import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Navbar.css";
// This identifies your web application to Google's authentication service

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="Navbar-container">
        <div id="nav-title" className="u-inlineBlock">listy</div>
        <div className="login-container u-inlineBlock">
        {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
          )}
          </div>
      </nav>
    );
  }
}

export default Navbar;
