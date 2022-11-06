const mongoose = require("mongoose");

const GerneSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Gerne", GerneSchema);
