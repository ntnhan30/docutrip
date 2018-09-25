import React, { Component } from "react";
import api from "../../api";
import AddActivity from "./AddActivity";
import {
  CardLink,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
// import { Link, Route } from "react-router-dom";

class TripPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trip: null,
      activities: []
    };
    this.updateActivities = this.updateActivities.bind(this);
  }

  updateActivities(result) {
    // console.log("RESULT IN TRIPAGE -->", result.activity);
    this.setState({
      activities: [...this.state.activities, result.activity]
    });
  }

  handleDelete(e, a, indexToRemove) {
    e.preventDefault();
    this.setState({
      activities: this.state.activities.filter(
        (activity, i) => i !== indexToRemove
      )
    });
    let id = a._id;
    // console.log("DEBUG  ID", a);
    api
      .deleteActivity(id)
      .then(result => {
        console.log("SUCCESS!");
      })
      .catch(err => {
        console.log("ERROR");
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
        <div>
          <h1>List of activities</h1>
          <Row>
            {this.state.activities.map((a, i) => (
              <Col sm="3" md="5" key={i}>
                <Card>
                  <CardTitle>{a.name}</CardTitle>
                  <CardSubtitle>Rating: {a.rating}</CardSubtitle>
                  <CardImg
                    top
                    width="100%"
                    src={a.photoUrl}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardLink href={a.website} target="_blank">
                      Home page
                    </CardLink>
                    <CardLink href={a.location} target="_blank">
                      Location
                    </CardLink>
                    <CardText>{a.comment}</CardText>
                    <Button
                      onClick={e => {
                        this.handleDelete(e, a, i);
                        {
                          /* this.updateActivities(); */
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              //{a.icon}
            ))}
          </Row>
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
