const Boards = require('../models/boards')

exports.create = async (req, res, next) => {
  const title = req.body.title;
  const background = req.body.background;
  const teams = req.body.teams;
  const userNo = req.body.userNo;

  try {
    const boards = new Boards({
      title: title,
      background: background,
      teams: teams,
      creator: userNo,
    })
    boards.userNoArray.push(userNo)
    boards.save()
  } catch (error) {

  }
}