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
            groups: [{_id:"1", users:['hi','yo'], groupName: 'OneGroup', activationCode:"fomo", creatorID: "@22", items: 0, timestamp: "200"},
            {_id:"2", users:['hi','yo'], groupName: 'TwoGroup', activationCode:"fomo", creatorID: "@22", items: 0, timestamp: "200"}],
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

//   newGroup = () => {
//     post("/api/group", {name:"Anotha One"});
//   }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    if (!this.props.userId) {
        return (<Menu>
            <p>Sign In!</p>
        </Menu>);
    }
    const userGroups = this.state.groups.map(group => {
        return <a href={`/${group._id}`} key={`group-${group.id}`}>{group.groupName}</a>
    });
    return (
      <Menu>
        {userGroups}
        <button onClick={this.getGroups}>{this.props.word}</button>
      </Menu>
    );
  }
}

export default Sidebar;