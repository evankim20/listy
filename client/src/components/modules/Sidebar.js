import React, { Component } from "react";
import { slide as Menu } from 'react-burger-menu'
import { Link } from "@reach/router";

import { post } from "../../utilities.js";

import "./Sidebar.css";


class Sidebar extends Component {
    constructor(props){
        super(props);
        this.state = {
            groups: [{_id:"1", users:['hi','yo'], groupName: 'OneGroup', activationCode:"fomo", creatorID: "@22", items: 0, timestamp: "200"},
            {_id:"2", users:['hi','yo'], groupName: 'TwoGroup', activationCode:"fomo", creatorID: "@22", items: 0, timestamp: "200"}],
        }
    }
  componentDidMount() {
      // TODO: get all groups user is part of and add here
  }

//   newGroup = () => {
//     post("/api/group", {name:"Anotha One"});
//   }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    const userGroups = this.state.groups.map(group => {
        return <Link to={`/${group._id}`} key={`group-${group.id}`}>{group.groupName}</Link>
    });
    return (
      <Menu>
        {userGroups}
      </Menu>
    );
  }
}

export default Sidebar;