const express = require("express");
const Activity = require("../models/Activity");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// Route to get all activities
router.get("/:tripID", (req, res, next) => {
  Country.find({ _trip: req.params.tripID })
    // .populate('__creator')
    // .populate({ path: "__creator", select: "username" })
    .then(activieties => {
      res.json(activieties);
    })
    .catch(err => next(err));
});

// Route to add an activity
router.post("/:tripID", isLoggedIn, (req, res, next) => {
  // let _creator = req.user._id;
  let _trip = req.params.tripID;
  let { comment, date } = req.body;
  Activity.create({
    name,
    icon,
    rating,
    website,
    location,
    comment,
    date,
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

router.put("/:activityID", isLoggedIn, (req, res, next) => {
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
