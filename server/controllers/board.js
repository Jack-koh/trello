const Boards = require('../models/boards');
const Relation = require('../models/relations/user_boards');

exports.get = async (req, res, next) => {
  try {
    const list = await Relation.find({ userNo: req.query.userNo });
    res.status(200).json({ list });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};

exports.create = async (req, res, next) => {
  const { title, background, userNo, userName, userEmail, favorite } = req.body;

  try {
    const boards = new Boards({
      creatorNo: userNo,
      creatorEmail: userEmail,
      creatorName: userName,
      title
    });
    const result = await boards.save();

    // user & board relation 저장
    const relation = new Relation({
      boardNo: result.boardNo,
      userNo,
      userEmail,
      userName,
      title,
      background,
      favorite
    });
    const respData = await relation.save();
    res.status(201).json({ list: respData });
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500;
    next(err);
  }
};
