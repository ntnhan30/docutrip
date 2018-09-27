import React, { Component } from "react";
import api from "../../api";
import { Button, Badge } from "reactstrap";
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
            <div>
              <div key={i} className="trip">
                <Link to={"/trip/" + t._id} key={t._id}>
                  <h5 style={{ fontFamily: "Dancing Script", color: "black" }}>
                    {t.name}
                  </h5>
                </Link>
              </div>
              <div className="tripDelete">
                <Badge
                  href="#"
                  color="light"
                  onClick={e => this.handleClick(e, t, i)}
                >
                  <img src="/DeleteIcon.svg" alt="" />
                </Badge>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default AllTrips;
