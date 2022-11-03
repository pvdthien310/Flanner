const mongoose = require("mongoose");

const KnowledgeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  posttime: {
    type: String,
  },
  listImage: {
    type: Array,
  },
  react: {
    type: Array,
  },
  rating: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating",
  },

  mode: {
    type: String,
  },
});

module.exports = mongoose.model("Knowledge", KnowledgeSchema);
