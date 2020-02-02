const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    userNo: {
      type: Number,
      required: true
    },
    boardNo: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    background: {}
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_board", Schema);
