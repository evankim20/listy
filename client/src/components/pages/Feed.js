import React, { Component } from "react";
import Item from "../modules/Item.js";
import Sidebar from "../modules/Sidebar.js";
import Navbar from "../modules/Navbar.js";
import GoogleLogin from "react-google-login";

import "./Feed.css";
import { get, post } from "../../utilities.js";

const GOOGLE_CLIENT_ID = "453842707124-jj6ct0qccpkmsaaflda1e9ba2233ocnm.apps.googleusercontent.com";

class Feed extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      items: [],
      inputText: "",
      groupId: "",
      groupName: "",
      users: [],
      activationCode: "",
      landingPage: false,
    };
  }

  componentDidMount() {
    // TODO: PARSE LOCATION ID
    const currentPath = this.props.location.pathname;
    const currGroup = currentPath.substring(currentPath.lastIndexOf("/") + 1);
    if (currGroup !== "landing") {
      console.log(currGroup);
      get("/api/items", { groupId: currGroup }).then((data) => {
        data.sort(
          (a, b) =>
            b.likedBy.length - b.dislikedBy.length - (a.likedBy.length - a.dislikedBy.length)
        );
        this.setState({ items: data, groupId: currGroup, landingPage: false });
      });

      get("/api/group", { groupId: currGroup }).then((data) => {
        this.setState({
          groupName: data.groupName,
          users: data.users,
          activationCode: data.activationCode,
        });
      });
    } else {
      this.setState({ landingPage: true });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  addItem = () => {
    const { items, inputText } = this.state;
    if (inputText.length !== 0) {
      const body = { content: inputText, groupId: this.state.groupId };
      post("/api/item", body).then((item) => {
        const newItems = items.concat([item]);
        this.setState({
          items: newItems,
          inputText: "",
        });
      });
    }
  };

  render() {
    let content = <div></div>;
    // NOT SIGNED IN
    if (!this.props.userId) {
      content = (
        <div className="feed-centered">
          <h2 className="feed-alert-text">Looks like you aren't signed in</h2>
          <h2 className="feed-alert-text">Login with Google to continue</h2>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
            id="feed-googlelogin"
          />
        </div>
      );
    }
    // LANDING PAGE
    else if (this.state.landingPage) {
      content = (
        <div className="feed-centered">
          <h2 className="feed-alert-text">Let's get started!</h2>
          <h2 className="feed-alert-text">Here's what you can do:</h2>
          <p className="feed-list-inst">1) Open the sidebar to select a group to view</p>
          <p className="feed-list-inst">2) Click the create link in the Navbar to create a group</p>
          <p className="feed-list-inst">3) Click the join link in the Navbar to join an existing group</p>
        </div>
      );
    }
    // THIS GROUP DOESNT EXIST --> couldn't get the groupName prop from API call
    else if (this.state.groupName === "") {
      content = (
        <div className="feed-centered">
          <h2 className="feed-alert-text">"This is not the group you are looking for"</h2>
          <h2 className="feed-alert-text">The requested group does not exist</h2>
        </div>
      );
    }
    // USER DOES NOT HAVE ACCESS TO THIS GROUP
    else if (!this.state.users.includes(this.props.userId)) {
      content = (
        <div className="feed-centered">
          <h2 className="feed-alert-text">Oops</h2>
          <h2 className="feed-alert-text">You dont have permissions to view this group</h2>
        </div>
      );
    }
    // USER HAS ACCESS BUT NO POSTS YET
    else if (this.state.items.length === 0) {
      content = (
        <div className="valid-feed-container">
          <div className="empty-header-container">
            <h1 id="title" className="u-headerFont">{this.state.groupName}</h1>
            <p className="u-headerFont">Invite Code: {this.state.activationCode}</p>
            <hr />
          </div>
          <div className="empty-feed-container">
          <p className="smaller-alert-text">It's lonely out here...</p>
          <p className="smaller-alert-text">Add the first item in the text box below!</p>
          </div>
          <div className="submit-container">
            <input className="text-input" type="text" placeholder="Your text here" value={this.state.inputText} onChange={this.handleInputChange} />
            <button onClick={this.addItem}>Submit</button>
          </div>
        </div>
      );
    }
    // USER HAS ACCESS AND POSTS ARE AVAILABLE
    else {
      content = (
        <div>
          <div className="header-container">
            <h1 id="title" className="u-headerFont">{this.state.groupName}</h1>
            <p id="invite-code" className="u-headerFont">Invite Code: {this.state.activationCode}</p>
          </div>
          <hr />
          <ul>
            {this.state.items.map((item, index) => (
              <span key={`span${index}`}>
                {" "}
                <Item
                  key={`item-${index}`}
                  groupId={this.state.groupId}
                  item={item}
                  userId={this.props.userId}
                />{" "}
                <hr key={`break-${index}`} />{" "}
              </span>
            ))}
          </ul>
          <div className="submit-container">
            <input className="text-input" type="text" placeholder="Your text here" value={this.state.inputText} onChange={this.handleInputChange} />
            <button onClick={this.addItem}>Submit</button>
          </div>
        </div>
      );
    }

    return (
      <div>
        {" "}
        <Navbar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
        />
        <div className="feed-container">
          <Sidebar userId={this.props.userId} />
          <div>{content}</div>
        </div>
      </div>
    );
  }
}

export default Feed;
