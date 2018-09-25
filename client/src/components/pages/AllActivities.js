import React, { Component } from "react";
import api from "../../api";
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
        <Row>
          {this.props.activities.map((a, i) => (
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
    );
  }
}
export default AllActivities;
