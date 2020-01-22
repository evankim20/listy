import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Navbar.css";
// This identifies your web application to Google's authentication service
require("dotenv").config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

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
        {/* <div className="NavBar-title u-inlineBlock">Catbook</div> */}
        <p className="topnav-right">listy</p>
        {/* <div className="NavBar-linkContainer u-inlineBlock">
          {this.props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : ( <></>
          )}
        </div> */}
      </nav>
    );
  }
}

export default Navbar;
