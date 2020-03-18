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

const trelloSchema = Schema(
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
      require: true
    },
    cardList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Card"
      }
    ]
  },
  { timestamps: true }
);

trelloSchema.plugin(autoIncrement.plugin, {
  model: "Trello",
  field: "trelloNo",
  startAt: 1,
  increment: 1
});

module.exports = mongoose.model("Trello", trelloSchema);
