const Boards = require("../models/boards");
const Relation = require("../models/relations/user_boards");

exports.create = async (req, res, next) => {
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
  const userNo = req.body.userNo;
  const item = Relation.find({ userNo: userNo });
  console.log(item);
};
