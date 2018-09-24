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
      activities: [],
      loading: true
    };
    this.updateActivities = this.updateActivities.bind(this);
  }

  updateActivities(result) {
    // e.preventDefault();
    console.log("This is triggered");
    console.log("RESULT IN TRIPAGE -->", result);
    this.setState({
      activities: [...this.state.activities, result]
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
        this.setState({
          comment: "",
          message: `Your activity has been deleted`
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
    if (this.state.loading) {
      return <div>loading....</div>;
    }
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
          {this.state.activities.map((a, i) => (
            <Row key={i}>
              <Col sm="3" md="5">
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
                    <CardLink href={a.website}>Home page</CardLink>
                    <CardLink href={a.location}>Location</CardLink>
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
            </Row>
            //{a.icon}
          ))}
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
