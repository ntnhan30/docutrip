import React, { Component } from "react";
import api from "../../api";
import ActivitiesByDate from "./ActivitiesByDate";
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

class AllActivities extends Component {
  constructor(props) {
    super(props);
  }

  // sortByDate Function
  // sortByDate(e) {
  //   console.log("DEBUG THIS IS TRIGGERED", e.target.value);
  //   let x = this.props.activities.filter(
  //     a => a.date.toString().substring(0, 10) === e.target.value
  //   );
  //   console.log("Activities", x);
  // }
  // delete button
  handleDelete(e, a, i) {
    e.preventDefault();
    let id = a._id;
    this.props.onDeleteActivity(i);
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
        <h1>List of activities</h1>
        <ActivitiesByDate
          activities={this.props.activities}
          // onHandleChange={e => this.sortByDate(e)}
          onHandleChange={e => this.props.sortByDate(e)}
        />
        <Row>
          {this.props.activities.map((a, i) => (
            <Col sm="6" md="3" key={i}>
              <Card>
                <CardTitle>{a.name}</CardTitle>
                <CardSubtitle>
                  <img src={a.icon} alt="" />
                </CardSubtitle>
                <CardSubtitle>Rating: {a.rating}</CardSubtitle>
                <CardSubtitle>
                  Date: {a.date.toString().substring(0, 10)}
                  {/* Date: {a.date} */}
                </CardSubtitle>
                <CardImg
                  top
                  width="100%"
                  src={a.photoUrl}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardLink href={a.website} target="_blank">
                    Website
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
          ))}
        </Row>
      </div>
    );
  }
}
export default AllActivities;
