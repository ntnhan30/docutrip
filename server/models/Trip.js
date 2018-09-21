const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  name: {
    type: String,
    required: [true, "The trip name is required"],
    minlength: 1
  },
  _creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
