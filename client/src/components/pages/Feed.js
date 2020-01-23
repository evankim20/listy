import React, { Component } from "react";
import Item from "../modules/Item.js";
import Sidebar from "../modules/Sidebar.js";
import Navbar from "../modules/Sidebar.js";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Feed.css";
import { post } from "../../utilities.js";
import { get } from "../../utilities";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class Feed extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      items: [],
      inputText: "",
    };
  }

  componentDidMount() {
    // TODO: PARSE LOCATION ID
    const currGroup = this.props.location.pathname.slice(1);
    console.log(currGroup);
    get("/api/items", { groupId: currGroup }).then((data) => {
      data.sort(
        (a, b) => b.likedBy.length - b.dislikedBy.length - (a.likedBy.length - a.dislikedBy.length)
      );
      this.setState({ items: data });
    });
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  addItem = () => {
    const { items, inputText } = this.state;
    if (inputText.length !== 0) {
      const body = { content: inputText };
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
    //TODO: groupname and activiation code hardcoded
    return (
      <div className="feed-container">
        <Sidebar />
        <Navbar />
        <div className="header-container">
          <h1 id="title">Silicon Valley Group</h1>
          <p>Activation Code: helloworld</p>
        </div>
        <hr />
        <ul>
          {this.state.items.map((item, index) => (
            <span> <Item key={`item-${index}`} item={item} /> <hr key={`break-${index}`}/> </span>
          ))}
        </ul>
        <div className="submit-container">
          <input type="text" value={this.state.inputText} onChange={this.handleInputChange} />
          <button onClick={this.addItem}>SUBMIT</button>
        </div>
      </div>
    );
  }
}

export default Feed;
