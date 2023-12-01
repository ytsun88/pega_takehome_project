const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
  },
  thumbnail: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
