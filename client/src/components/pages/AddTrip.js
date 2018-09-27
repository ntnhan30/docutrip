import React, { Component } from "react";
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
    api
      .postTrip(data)
      .then(result => {
        console.log("SUCCESS!");
        this.props.onAddTrip(result);
      })
      .catch(err => {
        console.log("ERROR");
      });
  }
  render() {
    return (
      <div className="AddTrip">
        <h2>Where's next ?</h2>
        <form>
          {/* Name:{" "} */}
          <input
            type="text"
            value={this.state.name}
            onChange={e => {
              this.handleInputChange("name", e);
            }}
          />{" "}
          <button onClick={e => this.handleClick(e)}>
            <img src="/tap.svg" className="Location-logo" alt="Tap" />
          </button>
        </form>
      </div>
    );
  }
}

export default AddTrip;
