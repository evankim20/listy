import React, { Component } from "react";
import Item from "../modules/Item.js";
// import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./Feed.css";

class Feed extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
        list: ["some content"],
        inputText: ""
      };
  }

  handleInputChange = (event) => {
    this.setState({
      inputText: event.target.value,
    });
  };

  addItem = () => {
    const { list, inputText } = this.state;
    const newList = list.concat([inputText]);
    this.setState({
      list: newList,
      inputText: ""
    });
  }; 

  componentDidMount() {
    // remember -- api calls go here!
    // get list for group
  }

  render() {
    // this.state.list.map((item, index) => { 
    //     console.log(item + index);
    // })
    return (
        // USER IS HARD CODED
      <>
        <h1>Group Name Here</h1>
        <p>Activation Code: helloworld</p>
        <hr />
        <ul>
            {this.state.list.map((item, index) => (
                <Item
                    key={`item-${index}`}
                    content={item}
                    user={"Bighead"}
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
      </>
    );
  }
}

export default Feed;
