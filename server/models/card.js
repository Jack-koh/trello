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
    boardNo: {
      type: Number,
      required: true
    },
    trelloNo: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

Schema.plugin(autoIncrement.plugin, {
  model: "card",
  field: "cardNo",
  startAt: 1,
  increment: 1
});

module.exports = mongoose.model("card", Schema);
