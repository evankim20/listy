import React, { Component } from "react";
import Item from "../modules/Item.js";
import Sidebar from "../modules/Sidebar.js";
import Navbar from "../modules/Navbar.js";

import "./Feed.css";
import { get, post } from "../../utilities.js";


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
    const currGroup = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    if (currGroup !== "landing") {
      console.log(currGroup);
      get("/api/items", { groupId: currGroup }).then((data) => {
        data.sort(
          (a, b) => (b.likedBy.length - b.dislikedBy.length) - (a.likedBy.length - a.dislikedBy.length)
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
      this.setState({landingPage: true});
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
      content = (<div>
        <p>User not signed in</p>
      </div>);
    }
    // LANDING PAGE
    else if (this.state.landingPage) {
      content = <div><p>Landing Page</p></div>;
    }
    // THIS GROUP DOESNT EXIST --> couldn't get the groupName prop from API call
    else if (this.state.groupName === "") {
      content = (<div>
        <p>Group doesnt exist</p>
      </div>);
    }
    // USER DOES NOT HAVE ACCESS TO THIS GROUP
    else if (!this.state.users.includes(this.props.userId)) {
      content = (<div>
        <p>No access</p>
      </div>);
    }
    // USER HAS ACCESS BUT NO POSTS YET
    else if (this.state.items.length === 0) {
      content = (<div>
        <p>No Posts Yet</p>
      </div>);
    }
    // USER HAS ACCESS AND POSTS ARE AVAILABLE
    else {
      content = (
        <div>
          <div className="header-container">
            <h1 id="title">{this.state.groupName}</h1>
            <p>Invite Code: {this.state.activationCode}</p>
          </div>
          <hr />
          <ul>
            {this.state.items.map((item, index) => (
              <span key={`span${index}`}>
                {" "}
                <Item key={`item-${index}`} groupId={this.state.groupId} item={item} userId={this.props.userId}/>{" "}
                <hr key={`break-${index}`} />{" "}
              </span>
            ))}
          </ul>
          <div className="submit-container">
            <input type="text" value={this.state.inputText} onChange={this.handleInputChange} />
            <button onClick={this.addItem}>SUBMIT</button>
          </div>
          </div>
      );
    }

    return (
      <div>      <Navbar
      handleLogin={this.props.handleLogin}
      handleLogout={this.props.handleLogout}
      userId={this.props.userId}
    />
      <div className="feed-container">
          <Sidebar userId={this.props.userId} />
          {content}
      </div>
      </div>

    )
  }
}

export default Feed;
