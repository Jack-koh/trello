const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const URI =
  "mongodb+srv://Jack:Jacky123@react-trello-pdjjd.mongodb.net/React-Trello?retryWrites=true&w=majority";
const connection = mongoose.createConnection(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
autoIncrement.initialize(connection);

const Schema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    creatorNo: {
      type: Number,
      require: true
    },
    creatorEmail: {
      type: String,
      require: true
    },
    creatorName: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

Schema.plugin(autoIncrement.plugin, {
  model: "board",
  field: "boardNo",
  startAt: 1,
  increment: 1
});

module.exports = mongoose.model("board", Schema);
