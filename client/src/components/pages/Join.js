import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Create.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { get, post } from "../../utilities.js";

const GOOGLE_CLIENT_ID = "453842707124-jj6ct0qccpkmsaaflda1e9ba2233ocnm.apps.googleusercontent.com";


/**
 * Component to render create page
 *
 * Proptypes
 * @param {string} userId of current user, undefined if not logged in
 * @param {function} handleLogin handles login functionality and changing state
 */
class Join extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      inputText: "",
      failed: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  joinGroup = () => {
    post("/api/join", { activationCode: this.state.inputText}).then((group) => {
      console.log(group);
      this.setState({
        inputText: "",
      });
      navigate(`/feed/${group._id}`);
    }).catch(this.setState({
        failed: true,
    }));
  };

  render() {
      let header;
      if (this.state.failed) {
        header = ( <div>
            <span className="failed-alert">That activationCode doesn't exist</span>
        </div>);
    }
    if (!this.props.userId) {
      return <><Link to="/feed/landing" className="return-link"><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
      <div className="create-container">
      <p className="feed-alert-text">You must login in order to join a group</p>
          <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-login"
            />
      </div>
      </>;
    } else {
      return (
        <>
          <Link to="/feed/landing" className="return-link"><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
          <div className="create-container">
            <div className="new-information">
            <h1 className="u-headerFont">Join a Group</h1>
            <p>Get a shared code from an existing memebr of the group you are trying to join</p>
            </div>
            <div className="create-input-container">
            <input className="input-bottomborder" type="text" placeholder="Shared code here" value={this.state.inputText} onChange={this.handleInputChange} />
          <br />
          <button onClick={this.joinGroup}>Send <FontAwesomeIcon icon={faArrowRight} /></button>
          <br />
          {header}
          </div>
        </div>
        </>
      );
    }
  }
}

{/* <div className="create-container">
            <div className="new-information">
            <h1 className="u-headerFont">Create a Group</h1>
            <p>A group provides a space for a shared list.</p>  
            <p>Your group's unique sharing code will be created after creation</p>
            </div>
            <div className="create-input-container">
          <input className="input-bottomborder" type="text" placeholder="Group name here" value={this.state.inputText} onChange={this.handleInputChange} />
          <br/>
          <button onClick={this.createGroup}>Send <FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div> */}


export default Join;
