import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu'
import { get } from "../../utilities.js";

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
          <div className="side-bar-container">
            <div className="bm-item-alert">Login to get started</div> 
          </div>
        </Menu>);
    }
    // no lists for current user
    else if (this.state.groups.length === 0) {
      return (<Menu>
        <div className="bm-item-alert">You currently have no lists</div>
        <div className="bm-item-alert">Start a List!</div>
        <div className="bm-item-alert">Or join one</div>
        <br />
        <div className="bm-item-alert">To create or join a group select the button on the navbar</div>
    </Menu>);
    }
    const userGroups = this.state.groups.map(group => {
        return <a href={`/feed/${group._id}`} key={`group-${group._id}`} className="group-container">{group.groupName}</a>
    });
    return (
      <Menu>
        <p id="sidebar-title">Your groups</p>
        {userGroups}
      </Menu>
    );
  }
}

export default Sidebar;