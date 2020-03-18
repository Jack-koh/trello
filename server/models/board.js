const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const boardSchema = Schema(
  {
    title: {
      type: String,
      require: true
    },
    userNo: {
      type: Number,
      require: true
    },
    userEmail: {
      type: String,
      require: true
    },
    userName: {
      type: String,
      require: true
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

boardSchema.plugin(autoIncrement.plugin, {
  model: "Board",
  field: "boardNo",
  startAt: 1,
  increment: 1
});

module.exports = mongoose.model("Board", boardSchema);
