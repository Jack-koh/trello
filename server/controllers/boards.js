const Boards = require("../models/boards");
const Relation = require("../models/relations/user_boards");

exports.create = async (req, res, next) => {
  console.log(req);
  const title = req.body.title;
  const background = req.body.background;
  const teams = req.body.teams;
  const url = req.body.teams;
  const userNo = req.body.userNo;

  try {
    const boards = new Boards({
      title: title,
      background: background,
      background: url,
      teams: true,
      creator: userNo
    });
    const result = await boards.save();

    // user & board relation 저장
    if (result.teams) {
      const relation = new Relation({
        userNo: userNo,
        boardNo: result.boardNo,
        title: title,
        background: background
      });
      await relation.save();
    }
    res
      .status(201)
      .json({ message: "Board created!", boardNo: result.boardNo });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.get = async (req, res, next) => {
  const userNo = req.query.userNo;
  const item = await Relation.find({ userNo: userNo }, { _id: 0 });
  res.status(200).json({ list: item });
};
