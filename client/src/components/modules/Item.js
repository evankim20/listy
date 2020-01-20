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
  }

  render() {
    return (
    <li className="item-container">
        <div className="content-box">
            <h2 id="content-text">{this.props.content}</h2>
            <p id="content-author">By: {this.props.user}</p>
        </div>
        <div className="vote-container">
            <button id="upvote"><FontAwesomeIcon icon={faChevronUp} /></button>
            <span id="vote-count">2</span>
            <button id="downvote"><FontAwesomeIcon icon={faChevronDown} /></button>
        </div>
    </li>
    );
  }
}

export default Item;
