import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AddTrip from "./pages/AddTrip";
import TripPage from "./pages/TripPage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import api from "../api";
import logo from "../logo.svg";
import "./App.css";
import "./style.scss";

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
          <div className="logoNav" className="center">
            {api.isLoggedIn() && (
              <Link to="/profile">
                <img src="/notebook.svg" className="App-logo" alt="logo" />
                <h3
                  style={{
                    fontFamily: "Dancing Script",
                    display: "inline",
                    color: "white"
                  }}
                >
                  {" "}
                  DocuTrip
                </h3>
              </Link>
            )}
          </div>

          <div className="logoutNav" className="center">
            {/* <Link to="/">DocuTrip</Link> */}
            {/* {api.isLoggedIn() && <Link to="/add-trip">Add trip</Link>} */}
            {!api.isLoggedIn() && <Link to="/signup">Signup</Link>}
            {!api.isLoggedIn() && <Link to="/login">Login</Link>}

            {api.isLoggedIn() && (
              <Link to="/" onClick={e => this.handleLogoutClick(e)}>
                <img
                  src="/logout.svg"
                  className="Location-logo"
                  alt="Comment"
                />
              </Link>
            )}
          </div>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-trip" component={AddTrip} />
          <Route path="/trip/:id" exact component={TripPage} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
        <div className="App-footer">
          <h1
            style={{
              fontFamily: "Dancing Script",
              color: "white"
            }}
          >
            Keep collecting memories
          </h1>
        </div>
      </div>
    );
  }
}

export default App;
