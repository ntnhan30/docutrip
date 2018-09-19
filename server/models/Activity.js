const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  // name: {
  //   type: String,
  //   required: [true, "The activity name is required"],
  //   minlength: 1
  // },
  photoUrl: {
    type: [String],
    default: []
  },
  name: String,
  icon: String,
  rating: Number,
  website: String,
  location: String,
  comment: String,
  date: Date,
  _trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip"
  }
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
