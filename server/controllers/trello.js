const Trello = require("../models/trello");

exports.get = async (req, res, next) => {
  try {
    const respData = await Trello.find({ boardNo: req.query.boardNo });
    res.status(200).json({ list: respData });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { boardNo, userNo, title } = req.body;
  try {
    const trello = new Trello({ userNo, boardNo, title });
    const respData = await trello.save();
    res.status(201).json({ item: respData });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { _id, updateTitle } = req.body;
  try {
    await Trello.updateOne({ _id }, { title: updateTitle });
    res.status(200).json({ message: "success update", _id, updateTitle });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { _id, confirmTitle } = req.query;
  try {
    const target = await Trello.findOne({ _id });
    if (target.title === confirmTitle) {
      await Trello.deleteOne({ _id });
      res.status(200).json({ message: "success delete", _id });
    }
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
