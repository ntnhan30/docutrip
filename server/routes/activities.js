const express = require("express");
const axios = require("axios");
const Activity = require("../models/Activity");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();

// Route to add an activity
router.post("/:tripID", isLoggedIn, (req, res, next) => {
  let _trip = req.params.tripID;
  let { comment, name, placeID } = req.body;
  axios({
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=AIzaSyCUUD_nI-yWZrq9Df4H3f9x3kbrDUAclLo`
    // params: "URL parameters to be sent with the request"
  })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      //Here we catch the error and display it
    });
  // let _creator = req.user._id;

  Activity.create({
    placeID,
    name,
    // icon,
    // rating,
    // website,
    // location,
    comment,
    // date,
    // _creator,
    _trip
  })
    .then(activity => {
      res.json({
        success: true,
        activity
      });
    })
    .catch(err => next(err));
});

router.delete("/:activityID", isLoggedIn, (req, res, next) => {
  Activity.findByIdAndRemove(req.params.activityID)
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(err => {
      return {
        success: false,
        error: err
      };
    });
});

router.patch("/:activityID", isLoggedIn, (req, res, next) => {
  Activity.findByIdAndUpdate(req.params.activityID, {
    comment: req.body.comment,
    date: req.body.date
  })
    .then(() => {
      res.json({
        success: true
      });
    })
    .catch(err => {
      return {
        success: false,
        error: err
      };
    });
});
module.exports = router;
