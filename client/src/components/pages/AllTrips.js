import React, { Component } from "react";
import api from "../../api";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

class AllTrips extends Component {
  // delete button
  handleClick(e, t, i) {
    e.preventDefault();
    let id = t._id;
    this.props.onDeleteTrip(i);
    api
      .deleteTrip(id)
      .then(result => {
        console.log("SUCCESS!");
      })
      .catch(err => {
        console.log("ERROR");
      });
  }
  render() {
    return (
      <div className="alltrips">
        {this.props.trips &&
          this.props.trips.map((t, i) => (
            <div key={i}>
              <Link to={"/trip/" + t._id} key={t._id}>
                {t.name}
              </Link>
              <div className="tripDelete">
                <Button onClick={e => this.handleClick(e, t, i)}>Delete</Button>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default AllTrips;
