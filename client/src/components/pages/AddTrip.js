import React, { Component } from "react";
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from "../../api";

class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
      // _creator: ""
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
    let data = {
      name: this.state.name
      // _creator: this.state._creator
    };
    console.log(data);
    api
      .postTrip(data)
      .then(result => {
        console.log("SUCCESS!");
        this.setState({
          name: "",
          // _creator: "",
          message: `Your trip '${this.state.name}' has been created`
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
      <div className="AddTrip">
        <h2>Add trip</h2>
        <form>
          Name:{" "}
          <input
            type="text"
            value={this.state.name}
            onChange={e => {
              this.handleInputChange("name", e);
            }}
          />{" "}
          <button onClick={e => this.handleClick(e)}>Create trip</button>
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

export default AddTrip;
