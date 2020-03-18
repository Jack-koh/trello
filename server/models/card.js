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

const cardSchema = Schema(
  {
    trelloId: {
      type: Schema.Types.ObjectId,
      ref: "Trello",
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

cardSchema.plugin(autoIncrement.plugin, {
  model: "Card",
  field: "cardNo",
  startAt: 1,
  increment: 1
});

module.exports = mongoose.model("Card", cardSchema);
