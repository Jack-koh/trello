const Trello = require('../models/trello');

exports.create = async (req, res, next) => {
  const { _id, title } = req.body;
  const result = await Trello.updateOne({ _id }, { $push: { cardList: { title } } });
  console.log(result);
};
