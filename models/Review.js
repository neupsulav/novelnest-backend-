const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  userImage: {
    type: String,
  },
  username: {
    type: String,
  },
  isVerifiedUser: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
  },
  reviewContent: {
    type: String,
  },
});

module.exports = new mongoose.model("Review", reviewsSchema);
