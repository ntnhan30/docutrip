import React, { Component } from "react";
import api from "../../api";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import { Input, Col, FormGroup, Form } from "reactstrap";

// Try to put it in .env file
// const MY_API_KEY_MAPS = "AIzaSyCUUD_nI-yWZrq9Df4H3f9x3kbrDUAclLo";
let REACT_APP_API_KEY_MAPS = process.env.REACT_APP_API_KEY_MAPS;

console.log(process.env.REACT_APP_API_KEY_MAPS);

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: null,
      comment: "",
      date: new Date(),
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
      placeID: this.state.placeID,
      date: this.state.date
    };
    // console.log("DEBUG PLACE ID", data);

    api
      .postActivity(id, data)
      .then(result => {
        // console.log("ACTIVITY --->", result);
        this.props.onAddActivity(result);
      })
      .catch(err => {
        console.log("ERROR");
      });
  }
  render() {
    const { search, value } = this.state;
    return (
      <div className="form">
        <Col lg={3}>
          <h6>Where have you been ?</h6>
          <Form>
            <GoogleMapLoader
              params={{
                key: REACT_APP_API_KEY_MAPS,
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
                    {/* Place:{" "} */}
                    {/* <Col sm={3}> */}
                    <Input
                      valid
                      type="text"
                      value={value}
                      placeholder="Search a location"
                      onChange={this.handleInputChangeG}
                    />
                    {/* </Col> */}
                  </GooglePlacesSuggest>
                )
              }
            />
            {/* Comment:{" "} */}
            <Input
              valid
              type="text"
              value={this.state.comment}
              placeholder="Your comment"
              onChange={e => {
                this.handleInputChange("comment", e);
              }}
            />{" "}
            {/* <br /> */}
            {/* Date:{" "} */}
            <Input
              valid
              type="date"
              value={this.state.date}
              onChange={e => {
                this.handleInputChange("date", e);
              }}
            />{" "}
            <br />
            <button onClick={e => this.handleClick(e)}>
              <img src="/tap.svg" className="Location-logo" alt="Tap" />
            </button>
          </Form>
        </Col>
      </div>
    );
  }
}
export default AddActivity;
