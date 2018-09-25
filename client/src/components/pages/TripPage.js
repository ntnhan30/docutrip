import React, { Component } from "react";
import api from "../../api";
import AddActivity from "./AddActivity";
import AllActivities from "./AllActivities";

class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      activities: []
    };
    this.updateActivities = this.updateActivities.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
        <div>
          {this.state.trip && this.state.trip.name}
          <AddActivity
            id={this.props.match.params.id}
            onAddActivity={this.updateActivities}
          />
        </div>
        <AllActivities
          activities={this.state.activities}
          onDeleteActivity={i => this.handleDelete(i)}
        />
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
