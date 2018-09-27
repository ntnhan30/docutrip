import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Container, Row, Col, CardImg } from "reactstrap";
class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {
    return (
      <div className="Home">
        <Container className="guide">
          <Row>
            <Col xs="6" className="guideText" className="center">
              <div>
                <h5>Ever think about doucment your awesome trips?</h5>
                <p>
                  {" "}
                  And all the places you have been? Just to save sweet memories
                  or to share with loved ones.
                </p>
                It sounds like a lot of works but DocuTrip gets your back.{" "}
                <br />
                With DocuTrip you can make travel dairy almost effortlessly and
                instantly. Curious? let's start !<p />
              </div>
            </Col>
            <Col xs="6" className="guidePic">
              <h6> 1. Add a trip</h6>{" "}
              <CardImg src="/trip.png" alt="" style={{ width: "150px" }} />
              <h6> 2. Choose the place</h6>
              <CardImg
                src="/input.png"
                alt=""
                style={{ width: "150px", margin: "1%" }}
              />
              <h6> 3. Memory saved</h6>
              <CardImg src="/place.png" alt="" style={{ width: "150px" }} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
