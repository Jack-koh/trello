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
    background: {},
    creator: {
      type: Number,
      require: true
    }
  },
  { regDate: new Date().getTime() / 1000 }
);

Schema.plugin(autoIncrement.plugin, {
  model: "boards",
  field: "boardNo",
  startAt: 1,
  increment: 1
});

module.exports = mongoose.model("boards", Schema);
