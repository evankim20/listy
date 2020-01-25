import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Navbar.css";

/**
 * The navigation bar at the top of all pages.
 * 
 * Proptypes
 * @param {string} userId of current user, undefined if not logged in
 * @param {function} handleLogin handles login functionality and changing state
 * @param {function} handleLogout handles logout functionality and changing state
 */
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="Navbar-container">
        <div id="nav-title" className="u-inlineBlock u-headerFont">
          listy
        </div>
        <div className="login-container u-inlineBlock">
          <Link to="/create" className="nav-link u-headerFont">
            Create
          </Link>
          <Link to="/join" className="nav-link u-headerFont">
            Join
          </Link>
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
