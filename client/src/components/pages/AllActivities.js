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
  Button,
  Badge
} from "reactstrap";

class AllActivities extends Component {
  constructor(props) {
    super(props);
  }

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
        <ActivitiesByDate
          activities={this.props.activities}
          chosenDate={this.props.chosenDate}
          // onHandleChange={e => this.sortByDate(e)}
          onChange={e => this.props.sortByDate(e)}
        />
        <Row>
          {this.props.activities
            .filter(
              a =>
                !this.props.chosenDate ||
                a.date.toString().substring(0, 10) ===
                  this.props.chosenDate.toString().substring(0, 10)
            )
            .map((a, i) => (
              <Col sm="6" md="3" key={i}>
                <Card
                  style={{ borderWidth: "1px", borderColor: "#02949f" }}
                  className="card"
                >
                  <CardTitle>
                    <img src={a.icon} className="Star-logo" alt="" /> {a.name}
                  </CardTitle>
                  {/* <CardSubtitle>
                    Date: {a.date.toString().substring(0, 10)}
                  </CardSubtitle> */}
                  <CardImg
                    style={{ objectFit: "cover" }}
                    top
                    width="100%"
                    height="150px"
                    src={a.photoUrl}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardText>
                      <img src="/star.svg" className="Star-logo" alt="" />
                      <small className="text-muted" className="Star-logo">
                        {a.rating}
                      </small>
                    </CardText>
                    <CardLink href={a.website} target="_blank">
                      <img
                        src="/homepage.svg"
                        className="Location-logo"
                        alt="Website"
                      />
                    </CardLink>
                    <CardLink href={a.location} target="_blank">
                      <img
                        src="/location.svg"
                        className="Location-logo"
                        alt="Location"
                      />
                    </CardLink>{" "}
                    <CardText style={{ fontFamily: "Indie Flower" }}>
                      <img
                        src="/chat.svg"
                        className="Location-logo"
                        alt="Comment"
                      />
                      " {a.comment}"
                    </CardText>
                    <Badge
                      href="#"
                      color="light"
                      onClick={e => {
                        this.handleDelete(e, a, i);
                      }}
                    >
                      <img src="/DeleteIcon.svg" alt="" />
                    </Badge>
                    {/* <Button
                      onClick={e => {
                        this.handleDelete(e, a, i);
                      }}
                    >
                      Delete
                    </Button> */}
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
