import React, { Component } from "react";
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from "../../api";
import axios from "axios";

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      name: ""
    };
    if (!api.isLoggedIn()) {
      this.props.history.push("/login");
    }
  }

  handleInputChange(stateFieldName, event) {
    let newState = {};
    newState[stateFieldName] = event.target.value;

    this.setState(newState);
  }

  handleClick(e) {
    e.preventDefault();
    let id = this.props.id;

    let data = {
      comment: this.state.comment,
      name: this.state.name
    };
    api
      .postActivity(id, data)
      .then(result => {
        console.log("SUCCESS!");
        this.setState({
          comment: "",
          message: `Your activity '${this.state.comment}' has been created`
        });
        setTimeout(() => {
          this.setState({
            message: null
          });
        }, 2000);
      })
      .catch(err => {
        console.log("ERROR");
      });
  }
  render() {
    return (
      <div className="AddActivity">
        <h2>Add activity</h2>
        <form>
          Comment:{" "}
          <input
            type="text"
            value={this.state.comment}
            onChange={e => {
              this.handleInputChange("comment", e);
            }}
          />{" "}
          <br />
          Name:{" "}
          <input
            type="text"
            value={this.state.name}
            onChange={e => {
              this.handleInputChange("name", e);
            }}
          />{" "}
          <button onClick={e => this.handleClick(e)}>Create activity</button>
        </form>
        <div
          style={{
            margin: 10,
            backgroundColor: "red",
            display: this.state.message ? "block" : "none"
          }}
        >
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default AddActivity;
