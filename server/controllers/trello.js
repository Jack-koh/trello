const Trellos = require("../models/trellos");

exports.get = async (req, res, next) => {
  try {
    const list = await Trellos.find({ boardNo: req.query.boardNo });
    res.status(200).json({ list });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { boardNo, userNo, userName, userEmail, title } = req.body;
  try {
    const trellos = new Trellos({
      creatorNo: userNo,
      creatorEmail: userEmail,
      creatorName: userName,
      boardNo,
      title
    });

    const respData = await trellos.save();
    res.status(201).json({ item: respData });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.update = async (req, res, next) => {
  const { _id, updateTitle } = req.body;
  try {
    await Trellos.updateOne({ _id }, { title: updateTitle });
    res.status(200).json({ message: "success update", _id, updateTitle });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const { _id, confirmTitle } = req.query;
  try {
    const target = await Trellos.findOne({_id})
    console.log(target.title)
    console.log(confirmTitle)
    if(target.title === confirmTitle) {
      await Trellos.deleteOne({ _id });
      res.status(200).json({ message: "success delete", _id });
    }
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
