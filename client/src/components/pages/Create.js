import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import GoogleLogin from "react-google-login";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Create.css";
import { post } from "../../utilities.js";



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
      failMessage: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  createGroup = () => {
    const groupNameLength = this.state.inputText.length;
    if (groupNameLength > 30) {
      this.setState({ failMessage: "Group name must be under 30 characters long", inputText: "",})
    } else if (groupNameLength === 0) {
      this.setState({ failMessage: "Group name must not be empty"})
    } else {
      post("/api/create", { name: this.state.inputText }).then((group) => {
        console.log(group);
        this.setState({
          inputText: "",
          failMessage: "",
        });
        navigate(`/feed/${group._id}`);
      });
    }
  };

  render() {
    let header = <span className="failed-alert">{this.state.failMessage}</span>
    if (!this.props.userId) {
      return <><Link to="/feed/landing" className="return-link"><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
      <div className="create-container">
      <p className="feed-alert-text">You must login in order to create a group</p>
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
            <h1 className="u-headerFont">Create a Group</h1>
            <p>A group provides a space for a shared list.</p>  
            <p>Your group's unique sharing code will be created after creation</p>
            </div>
            <div className="create-input-container">
          <input className="input-bottomborder" type="text" placeholder="Group name here" value={this.state.inputText} onChange={this.handleInputChange} />
          <br/>
          <button onClick={this.createGroup}>Send <FontAwesomeIcon icon={faArrowRight} /></button>
          <br /> {header}
          </div>
        </div>
        </>
      );
    }
  }
}

export default Create;
