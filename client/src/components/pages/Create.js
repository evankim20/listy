import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
// import "./Create.css";
import { get, post } from "../../utilities.js";



/**
 * Component to render create page
 *
 * Proptypes
 * @param {string} userId of current user, undefined if not logged in
 * @param {function} handleLogin handles login functionality and changing state
 */
class Create extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      inputText: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  createGroup = () => {
    post("/api/create", { name: this.state.inputText }).then((group) => {
      console.log(group);
      this.setState({
        inputText: "",
      });
      navigate(`/feed/${group._id}`);
    });
  };

  render() {
    if (!this.props.userId) {
      return <div><p>You need to sign in</p>
          <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
      </div>;
    } else {
      return (
        <div className="create-container">
          <Link to="/feed/landing">GO BACK</Link>
          <input type="text" value={this.state.inputText} onChange={this.handleInputChange} />
          <button onClick={this.createGroup}>SUBMIT</button>
        </div>
      );
    }
  }
}

export default Create;
