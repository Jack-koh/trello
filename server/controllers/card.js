const Trello = require("../models/trello");
const Card = require("../models/card");

exports.get = async (req, res, next) => {
  const boardNo = req.query.boardNo;
  const list = await Card.find({ boardNo });
  res.status(200).json({ list });
};

exports.create = async (req, res, next) => {
  const { boardNo, trelloNo, title } = req.body;
  // await Trello.updateOne(
  //   { trelloNo },
  //   { $push: { cardList: { titlem, trelloNo } } }
  // );
  const card = new Card({ boardNo, trelloNo, title });
  const respData = await card.save();
  res.status(201).json({ item: respData });
};
