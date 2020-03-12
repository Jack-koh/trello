const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    userNo: {
      type: Number,
      required: true
    },
    userName: {
      type: String,
      required: true
    },
    userEmail: {
      type: String,
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
    background: {
      type: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    },
    favorite: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("user_board", Schema);
