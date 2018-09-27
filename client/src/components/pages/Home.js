import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
// import api from "../api";
// import Profile from "./pages/Profile";
class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <div className="Home">
        <h2>Home</h2>
        {/* {api.isLoggedIn() && <Link to="/profile">Start</Link>}
        <Route path="/profile" component={Profile} /> */}
      </div>
    );
  }
}

export default Home;
