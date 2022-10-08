const mongoose = require("mongoose");

const NewCommentSchema = new mongoose.Schema(
  {
    postId: {
      required: true,
      type: String,
    },

    userId: {
      required: true,
      type: String,
    },

    reactUsers: {
      type: [],
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    isPositive: {
      type: String,
      required: true,
    },

    parentCmtId: {
      type: String,
      required: true,
    },

    childCmtId: {
      type: [],
      required: true,
    },

    level: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NewComment", NewCommentSchema);
