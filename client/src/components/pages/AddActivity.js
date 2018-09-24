import React, { Component } from "react";
// import { Route, Switch, NavLink, Link } from 'react-router-dom';
import api from "../../api";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
// Try to put it in .env file
const MY_API_KEY = "AIzaSyCUUD_nI-yWZrq9Df4H3f9x3kbrDUAclLo";
// const MY_API_KEY = process.env.API_KEY;

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: null,
      comment: "",
      // name: ""
      search: "",
      value: "",
      placeID: ""
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

  handleInputChangeG = e => {
    this.setState({
      search: e.target.value,
      value: e.target.value
    });
  };

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    // console.log(originalPrediction); // eslint-disable-line
    // console.log(geocodedPrediction); // eslint-disable-line

    this.setState({
      search: "",
      value: geocodedPrediction.formatted_address,
      placeID: geocodedPrediction.place_id
    });
    // console.log("DEBUG PLACE ID", this.state.placeID);
  };

  handleClick(e) {
    e.preventDefault();
    let id = this.props.id;
    let data = {
      comment: this.state.comment,
      placeID: this.state.placeID
      // name: this.state.name
    };
    console.log("DEBUG PLACE ID", data);

    api
      .postActivity(id, data)
      .then(result => {
        console.log("SUCCESS!");
        console.log("ACTIVITY --->", result);
        this.props.onAddActivity(result);
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
    const { search, value } = this.state;
    return (
      <div className="AddActivity">
        <h2>Add activity</h2>
        <form>
          <GoogleMapLoader
            params={{
              key: MY_API_KEY,
              libraries: "places,geocode"
            }}
            render={googleMaps =>
              googleMaps && (
                <GooglePlacesSuggest
                  googleMaps={googleMaps}
                  autocompletionRequest={{
                    input: search
                    // Optional options
                    // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                  }}
                  // Optional props
                  onSelectSuggest={this.handleSelectSuggest}
                  textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                  customRender={prediction => (
                    <div className="customWrapper">
                      {prediction
                        ? prediction.description
                        : "My custom no results text"}
                    </div>
                  )}
                >
                  Place:{" "}
                  <input
                    type="text"
                    value={value}
                    placeholder="Search a location"
                    onChange={this.handleInputChangeG}
                  />
                </GooglePlacesSuggest>
              )
            }
          />
          Comment:{" "}
          <input
            type="text"
            value={this.state.comment}
            onChange={e => {
              this.handleInputChange("comment", e);
            }}
          />{" "}
          <br />
          {/* Name:{" "}
          <input
            type="text"
            value={this.state.name}
            onChange={e => {
              this.handleInputChange("name", e);
            }}
          />{" "} */}
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
