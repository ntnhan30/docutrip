const express = require("express");
const { isLoggedIn } = require("../middlewares");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");
const User = require("../models/User");
const Trip = require("../models/Trip");

const router = express.Router();

const storage = cloudinaryStorage({
  cloudinary,
  folder: "my-images",
  allowedFormats: ["jpg", "png", "gif"]
});

const parser = multer({ storage });

router.get("/profile", isLoggedIn, (req, res, next) => {
  //find trips from the logged in user
  res.json(req.user);
});

// Route to get all trips on user profile
router.get("/trips", (req, res, next) => {
  Trip.find({ _creator: req.user._id })
    // .populate("__creator")
    // .populate({ path: "__creator", select: "username" })
    .then(trips => {
      res.json(trips);
    })
    .catch(err => next(err));
});

router.patch(
  "/profile",
  isLoggedIn,
  parser.single("picture"),
  (req, res, next) => {
    User.findByIdAndUpdate(req.user._id, {
      pictureUrl: req.file.secure_url
    })
      .then(() => {
        res.json({
          success: true,
          pictureUrl: req.file.secure_url
        });
      })
      .catch(err => {
        res.json({
          success: false,
          error: err
        });
      });
  }
);

module.exports = router;
