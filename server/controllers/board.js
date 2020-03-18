const Board = require("../models/board");

exports.get = async (req, res, next) => {
  try {
    const list = await Board.find({ userNo: req.query.userNo });
    res.status(200).json({ list });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { title, background, userNo, userName, userEmail, favorite } = req.body;
  try {
    const board = new Board({
      userNo,
      userEmail,
      userName,
      title,
      background,
      favorite
    });
    const respData = await board.save();
    res.status(201).json({ item: respData });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
