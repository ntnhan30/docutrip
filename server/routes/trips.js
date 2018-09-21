const express = require("express");
const Trip = require("../models/Trip");
const Activity = require("../models/Activity");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// Route to add a trip
router.post("/add", isLoggedIn, (req, res, next) => {
  let _creator = req.user._id;
  Trip.create({
    name: req.body.name,
    _creator
  })
    .then(trip => {
      res.json({
        success: true,
        trip
      });
    })
    .catch(err => next(err));
});

// Route to get 1 trip (all activities)
router.get("/:tripID/activities", (req, res, next) => {
  Activity.find({ _trip: req.params.tripID })
    // .populate('__creator')
    // .populate({ path: "__creator", select: "username" })
    .then(activities => {
      res.json(activities);
    })
    .catch(err => next(err));
});
// Route to get 1 specific trip
router.get("/:tripID", isLoggedIn, (req, res, next) => {
  Trip.findById(req.params.tripID)
    .then(trip => {
      res.json(trip);
    })
    .catch(err => {
      return {
        success: false,
        error: err
      };
    });
});
router.delete("/:tripID", isLoggedIn, (req, res, next) => {
  Trip.findByIdAndRemove(req.params.tripID)
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

router.patch("/:tripID", isLoggedIn, (req, res, next) => {
  // let _creator = req.user._id;
  Trip.findByIdAndUpdate(req.params.tripID, {
    name: req.body.name
  })
    .then(trip => {
      res.json({
        success: true,
        trip
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
