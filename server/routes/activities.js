const express = require("express");
const axios = require("axios");
const Activity = require("../models/Activity");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const API_KEY = process.env.API_KEY;

// Route to add an activity
router.post("/:tripID", isLoggedIn, (req, res, next) => {
  // let _creator = req.user._id;
  let _trip = req.params.tripID;
  let { comment, placeID } = req.body;
  axios({
    method: "get",
    url: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${API_KEY}`
    // params: "URL parameters to be sent with the request"
  })
    .then(response => {
      // console.log(
      //   "DEBUG RESPONE",
      //   response.data.result.name,
      //   "DEBUG ICON",
      //   response.data.result.icon,
      //   "DEBUG RATING",
      //   response.data.result.rating,
      //   "DEBUG WEB",
      //   response.data.result.website,
      //   "DEBUG LOCATION",
      //   response.data.result.url
      // );
      Activity.create({
        // placeID,
        name: response.data.result.name,
        icon: response.data.result.icon,
        rating: response.data.result.rating,
        website: response.data.result.website,
        location: response.data.result.url,
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
