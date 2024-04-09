const mongoose = require("mongoose");
const Review = require("./Review");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  productId: {
    type: Number,
  },
  details: {
    type: String,
  },
  currentprice: {
    type: Number,
  },
  originalprice: {
    type: Number,
  },
  images: [
    {
      type: String,
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Review,
    },
  ],
});

module.exports = mongoose.model("Products", productSchema);
