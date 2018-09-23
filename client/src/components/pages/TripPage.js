import React, { Component } from "react";
import api from "../../api";
import AddActivity from "./AddActivity";

import { Link, Route } from "react-router-dom";

class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      activities: null
    };
  }
  render() {
    return (
      <div>
        <div>
          {this.state.trip && this.state.trip.name}
          <AddActivity id={this.props.match.params.id} />
        </div>
        <div>
          <h1>List of activities</h1>
          {this.state.activities &&
            this.state.activities.map(a => (
              <li key={a._id}>
                {a.comment} {a.name}
              </li>
            ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    api.gettrip(id).then(trip => {
      this.setState({
        trip: trip
      });
    });
    api.getActivities(id).then(activities => {
      this.setState({
        activities: activities
      });
    });
  }
}

export default TripPage;
