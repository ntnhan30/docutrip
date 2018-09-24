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
      //   response.data.result.photos[0].photo_reference
      // );
      Activity.create({
        // placeID,
        name: response.data.result.name,
        icon: response.data.result.icon,
        rating: response.data.result.rating,
        website: response.data.result.website,
        location: response.data.result.url,
        comment,
        photoUrl: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${
          response.data.result.photos[0].photo_reference
        }&key=${API_KEY}`,
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
