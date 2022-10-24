const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    positive: {
      type: Number,
      required: true,
    },
    negative: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
