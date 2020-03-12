const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model("card", Schema);
