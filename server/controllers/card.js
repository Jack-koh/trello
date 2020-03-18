const Trello = require("../models/trello");
const Card = require("../models/card");

exports.get = async (req, res, next) => {
  const boardNo = req.query.boardNo;
  const list = await Card.find({ boardNo });
  res.status(200).json({ list });
};

exports.create = async (req, res, next) => {
  const { trelloId, trelloNo, title } = req.body;
  
  const card = new Card({ trelloId, trelloNo, title });
  const respData = await card.save();

  const trello = await Trello.findById(trelloId);
  trello.cardList.push(card);
  await trello.save();
  
  res.status(201).json({ item: respData });
};
