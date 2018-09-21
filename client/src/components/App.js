import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AddTrip from "./pages/AddTrip";
import TripPage from "./pages/TripPage";
import TestingApi from "./pages/TestingApi";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import api from "../api";
import logo from "../logo.svg";
import "./App.css";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {

  //   };
  // }

  handleLogoutClick(e) {
    api.logout();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Home</Link>
          {api.isLoggedIn() && <Link to="/add-trip">Add trip</Link>}
          {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
          {!api.isLoggedIn() && <Link to="/login">Login</Link>}
          {api.isLoggedIn() && <Link to="/profile">Profile</Link>}
          {api.isLoggedIn() && <Link to="/testing-api">Testing</Link>}
          {api.isLoggedIn() && (
            <Link to="/" onClick={e => this.handleLogoutClick(e)}>
              Logout
            </Link>
          )}
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-trip" component={AddTrip} />
          <Route path="/testing-api" component={TestingApi} />
          <Route path="/trip/:id" exact component={TripPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
