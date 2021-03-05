const db = require('../db')

exports.get = async (req, res, next) => {
  const { userNo, searchText } = req.query

  try {
    let queryText = `SELECT * FROM link_users_boards
    INNER JOIN boards
    ON link_users_boards.user_no = '${userNo}'
    AND boards.board_no =  link_users_boards.board_no`
    if (searchText) queryText = queryText + ` WHERE title LIKE '${searchText}'`

    const query = await db.query(queryText)
    res.status(200).json({
      list: query.rows.map((item) => {
        const { board_no, title, background_type, background_name, favorite, reg_date } = item
        return {
          boardNo: board_no,
          title,
          backgroundType: background_type,
          backgroundName: background_name,
          favorite,
          regDate: reg_date,
        }
      }),
    })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.create = async (req, res, next) => {
  const { title, backgroundType, backgroundName, favorite, userNo } = req.body

  try {
    const query = await db.query(
      `INSERT INTO boards VALUES(
        DEFAULT,
        '${title}',
        '${backgroundType}',
        '${backgroundName}',
        '${favorite}',
        extract(epoch from now()))
        RETURNING *`
    )

    const item = query.rows[0]
    await db.query(`INSERT INTO trellos_order VALUES('${item.board_no}', null)`)
    await db.query(`INSERT INTO link_users_boards VALUES('${userNo}','${item.board_no}')`)

    res.status(201).json({ item })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.update = async (req, res, next) => {
  const { boardNo, title, backgroundType, backgroundName, favorite } = req.body

  try {
    const query = await db.query(
      `UPDATE boards SET
      title = '${title}',
      background_type = '${backgroundType}',
      background_name = '${backgroundName}',
      favorite = '${favorite}'
      WHERE board_no = '${boardNo}'
      RETURNING *`
    )
    const item = query.rows[0]
    res.status(201).json({ item })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  const { boardNo } = req.query

  try {
    await db.query(`DELETE FROM boards WHERE board_no = ${boardNo}`)
    await db.query(`DELETE FROM link_users_boards WHERE board_no = ${boardNo}`)
    res.status(201).json({ message: 'success delete', boardNo: +boardNo })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}
