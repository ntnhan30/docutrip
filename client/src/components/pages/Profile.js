import React, { Component } from "react";
import api from "../../api";
import AddTrip from "./AddTrip";
import AllTrips from "./AllTrips";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      pictureUrl: null,
      trips: []
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange(e) {
    // console.log("handleChange");
    // console.log("DEBUG e.target.files[0]", e.target.files[0]);
    this.setState({
      file: e.target.files[0]
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    api.addProfilePicture(this.state.file).then(data => {
      if (data.success) {
        this.setState({
          pictureUrl: data.pictureUrl
        });
      }
    });
  }

  handleDelete(index) {
    // console.log("i FROM PROFILE", index);
    // e.preventDefault();
    this.setState({
      trips: this.state.trips.filter((trips, i) => i !== index)
    });
  }

  handleAdd(result) {
    // console.log("RESULT IN PROFILE -->", result);
    this.setState({
      trips: [...this.state.trips, result.trip]
    });
  }

  render() {
    return (
      <div className="ProfileInfo">
        <div className="Profile">
          <h1>My profile</h1>
          {this.state.username}
          <br />
          {this.state.pictureUrl && <img src={this.state.pictureUrl} />}
          {!this.state.pictureUrl && (
            <img src="https://iupac.org/cms/wp-content/uploads/2018/05/default-avatar.png" />
          )}

          <h2>New picture</h2>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input type="file" onChange={e => this.handleChange(e)} /> <br />
            <button>Upload new picture</button>
          </form>
          <br />
          <br />
        </div>
        <div className="trips">
          <AddTrip onAddTrip={e => this.handleAdd(e)} />
          <h1>Trips</h1>
          <AllTrips
            trips={this.state.trips}
            onDeleteTrip={i => this.handleDelete(i)}
          />
        </div>
      </div>
    );
  }
  componentDidMount() {
    api.getProfile().then(user => {
      this.setState({
        username: user.username,
        pictureUrl: user.pictureUrl
      });
    });
    api.gettrips().then(trips => {
      this.setState({
        trips: trips
      });
    });
  }
}
export default Profile;
