import React, { Component } from "react";
import { Router, Redirect } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Feed from "./pages/Feed.js";
import Start from "./pages/Start.js";
import Navbar from "./modules/Navbar.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  async componentDidMount() {
    await get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ userId: user._id });
      }
    });
  }

  handleLogin = async (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({ userId: user._id });
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };


  render() {
    return (
      <>
      <Navbar
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <Router>
          {/* <Start path="/" handleLogin={this.handleLogin} userId={this.state.userId} /> */}
          {/* <Feed path="/" userId={this.state.userId} handleLogout={this.handleLogout} /> */}
          {/* <Feed path="/" userId={this.state.userId} /> */}
          <Feed path="/:groupId" userId={this.state.userId} />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;

{
  /* <Feed
path="/"
handleLogin={this.handleLogin}
handleLogout={this.handleLogout}
userId={this.state.userId}
/> */
}

{
  /* <Navbar
handleLogin={this.handleLogin}
handleLogout={this.handleLogout}
userId={this.state.userId}
/> */
}
