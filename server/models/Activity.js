const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  photoUrl: {
    type: String,
    default: ""
  },
  placeID: String,
  name: String,
  icon: String,
  rating: Number,
  website: String,
  location: String,
  comment: String,
  date: {
    type: Date
  },
  _trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip"
  }
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
