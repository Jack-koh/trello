const Trellos = require("../models/trellos");

exports.get = async (req, res, next) => {
  try {
    const list = await Trellos.find({ boardNo: req.query.boardNo }, { _id: 0 });
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
    res.status(201).json({ list: respData });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
