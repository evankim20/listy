import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'

import "./Item.css";

/**
 * Component to render a item on a list
 *
 * Proptypes
 * @param {string} key of item
 * @param {string} content of item
 * @param {string} user that posted item
 */

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
        voteCount: 0,
    };
  }

  upVote = () => {
    this.setState((prevState) => {
        return {voteCount: prevState.voteCount + 1}
    })
  }

  downVote = () => {
    this.setState((prevState) => {
        return {voteCount: prevState.voteCount - 1}
    })
  }

  render() {
    return (
    <li className="item-container">
        <div className="content-box">
            <h2 id="content-text">{this.props.content}</h2>
            <p id="content-author">By: {this.props.user}</p>
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
