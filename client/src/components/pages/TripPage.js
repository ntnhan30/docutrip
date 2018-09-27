import React, { Component } from "react";
import api from "../../api";
import AddActivity from "./AddActivity";
import AllActivities from "./AllActivities";

class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      activities: [],
      chosenDate: ""
    };
    this.updateActivities = this.updateActivities.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.sortByDateHandel = this.sortByDateHandel.bind(this);
  }
  sortByDateHandel(e) {
    console.log("DEBUG THIS IS TRIGGERED", e.target.value);
    this.setState({
      chosenDate: e.target.value
    });
  }

  updateActivities(result) {
    // console.log("RESULT IN TRIPAGE -->", result.activity);
    this.setState({
      activities: [...this.state.activities, result.activity]
    });
  }

  handleDelete(index) {
    // console.log("i FROM PROFILE", index);
    // e.preventDefault();
    this.setState({
      activities: this.state.activities.filter((activities, i) => i !== index)
    });
  }

  render() {
    return (
      <div>
        <div className="tripName">
          <h1>{this.state.trip && this.state.trip.name}</h1>
          <div className="greenLine" />
          <div className="green" />
        </div>
        <AllActivities
          activities={this.state.activities}
          chosenDate={this.state.chosenDate}
          onDeleteActivity={i => this.handleDelete(i)}
          sortByDate={e => this.sortByDateHandel(e)}
        />
        <div>
          <AddActivity
            id={this.props.match.params.id}
            onAddActivity={this.updateActivities}
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    api.gettrip(id).then(trip => {
      this.setState({
        trip: trip,
        loading: false
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
