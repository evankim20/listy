import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "./Item.css";
import { post } from "../../utilities";


/**
 * Component to render a item on a list
 *
 * Proptypes
 * @param {string} key of item
 * @param {Object} item from ../../server/models/item.js
 */

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
        voteCount: 0,
    };
  }

  componentDidMount(){
      this.setState(
          {voteCount: this.props.item.likedBy.length - this.props.item.dislikedBy.length}
        );
  }

  upVote = () => {
      // TODO: hardcode group id, userId
    post("/api/like", {groupId: "1", _id: this.props.item._id, userId: "TESTING"});
    this.setState((prevState) => {
        return {voteCount: prevState.voteCount + 1}
    })
  }

  downVote = () => {
    post("/api/dislike", {groupId: "1", _id: this.props.item._id, userId: "TESTING"});
    this.setState((prevState) => {
        return {voteCount: prevState.voteCount - 1}
    })
  }

  render() {
    return (
    <li className="item-container">
        <div className="content-box">
            <h2 id="content-text">{this.props.item.content}</h2>
            <p id="content-author">By: {this.props.item.sender.name}</p>
        </div>
        <div className="vote-container">
            <button id="upvote" onClick={this.upVote}><FontAwesomeIcon icon={faChevronUp} /></button>
            <span id="vote-count">{this.state.voteCount}</span>
            <button id="downvote" onClick={this.downVote}><FontAwesomeIcon icon={faChevronDown} /></button>
        </div> 
    </li>
    );
  }
}

export default Item;
