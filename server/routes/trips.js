const express = require("express");
const Trip = require("../models/Trip");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// Route to get all trips on user profile
router.get("/:userID", (req, res, next) => {
  Trip.find({ _creator: req.params.tripID })
    // .populate('__creator')
    // .populate({ path: "__creator", select: "username" })
    .then(trips => {
      res.json(trips);
    })
    .catch(err => next(err));
});

// Route to add a trip
router.post("/:userID/add", isLoggedIn, (req, res, next) => {
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

router.put("/:tripID", isLoggedIn, (req, res, next) => {
  let _creator = req.user._id;
  Trip.findByIdAndUpdate(req.params.tripID, {
    _creator,
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
