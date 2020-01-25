import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu'
import { Link } from "@reach/router";
import Radium from 'radium';

import { post, get } from "../../utilities.js";

let RadiumLink = Radium(Link);

import "./Sidebar.css";

// TODO: adding will update groups
class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            groups: [],
        }
    }

  componentDidMount() {
      if (this.props.userId){
        get("/api/user/groups").then((groups) => {
            this.setState({ groups: groups });
        });
      } else {
          this.setState({ groups: [] })
      }
  }

  componentDidUpdate(prevProps) {
      if (prevProps.userId !== this.props.userId && this.props.userId) {
        get("/api/user/groups").then((groups) => {
            this.setState({ groups: groups });
        });
      }
  }

  getGroups = () => {
    if (this.props.userId){
        get("/api/user/groups").then((groups) => {
            console.log(groups);
        });
      } else {
          console.log("not logged in");
      }
  }



  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    // no user logged in
    if (!this.props.userId) {
        return (<Menu>
            <p>Sign In!</p>
        </Menu>);
    }
    // no lists for current user
    else if (!this.state.groups.length === 0) {
      return (<Menu>
        <p>Start a List!</p>
        <p>Or join one</p>
    </Menu>);
    }
    const userGroups = this.state.groups.map(group => {
        return <a href={`/feed/${group._id}`} key={`group-${group._id}`}>{group.groupName}</a>
    });
    return (
      <Menu>
        {userGroups}
      </Menu>
    );
  }
}

export default Sidebar;