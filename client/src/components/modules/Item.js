import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

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
      userLiked: false,
      userDisliked: false,
    };
  }

  componentDidMount() {
    this.setState({
      voteCount: this.props.item.likedBy.length - this.props.item.dislikedBy.length,
      userLiked: this.props.item.likedBy.includes(this.props.userId),
      userDisliked: this.props.item.dislikedBy.includes(this.props.userId),
    });
  }

  upVote = () => {
    if (this.state.userLiked) {
      post("/api/removelike", { groupId: this.props.groupId, _id: this.props.item._id }).then(
        this.setState((prevState) => {
          return { 
            voteCount: prevState.voteCount - 1,
            userLiked: false,
           };
        })
      );
    } else {
      post("/api/like", { groupId: this.props.groupId, _id: this.props.item._id }).then(
        this.setState((prevState) => {
          return { 
            voteCount: prevState.voteCount + 1,
            userLiked: true,
           };
        })
      );
    }
  };

  downVote = () => {
    if (this.state.userDisliked) {
      post("/api/removedislike", { groupId: this.props.groupId, _id: this.props.item._id }).then(
        this.setState((prevState) => {
          return { 
            voteCount: prevState.voteCount + 1,
            userDisliked: false,
           };
        })
      );
    } else {
      post("/api/dislike", { groupId: this.props.groupId, _id: this.props.item._id });
      this.setState((prevState) => {
        return { 
          voteCount: prevState.voteCount - 1,
          userDisliked: true, 
        };
      });
    }
  };

  render() {
    return (
      <li className="item-container">
        <div className="content-box">
          <h2 id="content-text">{this.props.item.content}</h2>
          <p id="content-author">By: {this.props.item.sender.name}</p>
        </div>
        <div className="vote-container">
          <button
            id="upvote"
            className={this.state.userLiked ? "upvote-selected" : ""}
            onClick={this.upVote}
          >
            <FontAwesomeIcon icon={faChevronUp} />
          </button>
          <span id="vote-count">{this.state.voteCount}</span>
          <button
            id="downvote"
            className={this.state.userDisliked ? "downvote-selected" : ""}
            onClick={this.downVote}
          >
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        </div>
      </li>
    );
  }
}

export default Item;
