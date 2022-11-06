const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    positive: {
      type: Number,
      default: 0,
      required: true,
    },
    negative: {
      type: Number,
      default: 0,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
