import React, { Component } from "react";
import Item from "../modules/Item.js";
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
        inputText: ""
      };
  }

  componentDidMount() {
    get("/api/items", { groupId: "1" }).then(data => {
        data.sort((a,b) => (b.likedBy.length - b.dislikedBy.length) - (a.likedBy.length - a.dislikedBy.length));
        this.setState({items: data});
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
        const body = {content: inputText};
        post("/api/item", body).then(item => {
            const newItems = items.concat([item]);
            this.setState({
              items: newItems,
              inputText: ""
            });
        })
    }
  }; 

  render() {
      //TODO: groupname and ativiation code hardcoded
    return (
      <div className="feed-container">
        <h1>Silicon Valley Group</h1>
        <p>Activation Code: helloworld</p>
        <hr />
        <ul>
            {this.state.items.map((item, index) => (
                <Item
                    key={`item-${index}`}
                    item={item}
                />
            ))}
        </ul>
        <div className="submit-container">
            <input 
                type="text"
                value={this.state.inputText}
                onChange={this.handleInputChange}
            />
            <button onClick={this.addItem}>SUBMIT</button>
        </div>
      </div>
    );
  }
}

export default Feed;
