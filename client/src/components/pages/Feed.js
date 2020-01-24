import React, { Component } from "react";
import Item from "../modules/Item.js";
import Sidebar from "../modules/Sidebar.js";
import Navbar from "../modules/Navbar.js";
// import GoogleLogin, { GoogleLogout } from "react-google-login";
import "./Feed.css";
import { post } from "../../utilities.js";
import { get } from "../../utilities";


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
    };
  }

  componentDidMount() {
    // TODO: PARSE LOCATION ID
    const currGroup = this.props.location.pathname.slice(1);
    console.log(currGroup);
    get("/api/items", { groupId: currGroup }).then((data) => {
      data.sort(
        (a, b) => (b.likedBy.length - b.dislikedBy.length) - (a.likedBy.length - a.dislikedBy.length)
      );
      this.setState({ items: data, groupId: currGroup });
    });

    get("api/group", { groupId: currGroup }).then((data) => {
      this.setState({
        groupName: data.groupName,
        users: data.users,
      });
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
      //TODO: groupname and activiation code hardcoded
      content = (
        <div>
          <div className="header-container">
            <h1 id="title">{this.state.groupName}</h1>
            <p>Activation Code: helloworld</p>
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
      <div className="feed-container">
          <Sidebar userId={this.props.userId} word="HELLO" />
          {content}
      </div>

    )
  }
}

export default Feed;
