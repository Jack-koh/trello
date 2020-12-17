const db = require('../db')

exports.get = async (req, res, next) => {
  const { boardNo } = req.query
  try {
    const trelloQuery = await db.query(`SELECT * FROM trellos WHERE board_no = '${boardNo}'`)
    const trelloOrderQuery = await db.query(`SELECT * FROM trellos_order WHERE board_no = '${boardNo}'`)

    const trelloList = trelloQuery.rows
    const trelloOrder = trelloOrderQuery.rows[0]
    let trellos = []
    if (trelloOrder.list_order) {
      const orderArr = trelloOrder.list_order.split(',')
      orderArr.forEach((trelloNo) => {
        const find = trelloList.find((trello) => trello.trello_no === +trelloNo)
        trellos = [
          ...trellos,
          { trelloNo: find.trello_no, title: find.title, regDate: find.reg_date, boardNo: find.board_no },
        ]
      })
    }

    const cardQuery = await db.query(
      `SELECT
      cards.card_no,
      cards.title,
      cards.label,
      cards.description,
      cards.reg_date,
      cards.trello_no 
      FROM cards
      LEFT JOIN trellos
      ON trellos.board_no = '${boardNo}'
      AND cards.trello_no = trellos.trello_no`
    )
    const cardOrderQuery = await db.query(
      `SELECT
      cards_order.trello_no,
      list_order FROM cards_order
      LEFT JOIN trellos
      ON trellos.board_no = '${boardNo}'
      AND cards_order.trello_no = trellos.trello_no`
    )

    const cardList = cardQuery.rows
    const cardOrders = cardOrderQuery.rows

    let cards = []
    cardOrders.forEach((target) => {
      if (target.list_order) {
        const orderArr = target.list_order.split(',')
        orderArr.forEach((cardNo) => {
          const find = cardList.find((item) => item.card_no === +cardNo)
          const dataIndex = cards.findIndex((data) => data.trelloNo === find.trello_no)

          const insertData = {
            cardNo: find.card_no,
            title: find.title,
            label: find.label,
            description: find.description,
            regDate: find.reg_date,
            trelloNo: find.trello_no,
          }

          if (dataIndex > -1) {
            cards[dataIndex].list = [...cards[dataIndex].list, insertData]
          } else {
            cards = [...cards, { trelloNo: find.trello_no, list: [insertData] }]
          }
        })
      }
    })

    res.status(200).json({ trelloList: trellos, cardList: cards })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.create = async (req, res, next) => {
  const { boardNo, title } = req.body

  try {
    const insertTrello = await db.query(`INSERT INTO trellos VALUES(DEFAULT, '${title}', extract(epoch from now()), '${boardNo}') RETURNING *`) //prettier-ignore
    const item = insertTrello.rows[0]

    const orderQuery = await db.query(`SELECT * FROM trellos_order WHERE board_no = '${boardNo}'`)
    const orderTarget = orderQuery.rows[0]
    let insertOrder = ''
    if (orderTarget.list_order) {
      const orderArr = orderTarget.list_order.split(',')
      orderArr.push(item.trello_no)
      orderArr.join()
      insertOrder = orderArr.join()
    } else {
      insertOrder = item.trello_no
    }

    await db.query(`UPDATE trellos_order SET list_order = '${insertOrder}' WHERE board_no = '${boardNo}'`) //prettier-ignore
    await db.query(`INSERT INTO cards_order VALUES('${item.trello_no}', null)`)

    res.status(201).json({
      item: {
        trelloNo: item.trello_no,
        title: item.title,
        regDate: item.reg_date,
        boardNo: item.board_no,
      },
    })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.update = async (req, res, next) => {
  const { trelloNo, title } = req.body
  const queryText = `UPDATE trellos SET title = '${title}' WHERE trello_no = '${trelloNo}' RETURNING *`

  try {
    await db.query(queryText)
    res.status(200).json({ message: 'success update', trelloNo, title })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.drag = async (req, res, next) => {
  const { item, sourceIndex, destIndex } = req.body
  const boardNo = item.boardNo

  try {
    const orderQuery = await db.query(`SELECT * FROM trellos_order WHERE board_no = '${boardNo}'`)
    const orderArr = orderQuery.rows[0].list_order.split(',')

    orderArr.splice(sourceIndex, 1)
    orderArr.splice(destIndex, 0, item.trelloNo.toString())

    await db.query(`UPDATE trellos_order SET list_order = '${orderArr.join()}' WHERE board_no = '${boardNo}'`)
    res.status(200).json({ message: 'Trello drag success!' })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.delete = async (req, res, next) => {
  const { trelloNo, boardNo } = req.query
  try {
    await db.query(`DELETE FROM trellos WHERE trello_no = ${trelloNo}`)
    const trelloOrderQuery = await db.query(`SELECT * FROM trellos_order WHERE board_no = '${boardNo}'`)
    const trelloOrder = trelloOrderQuery.rows[0]
    const orderArr = trelloOrder.list_order.split(',')
    const updateOrder = orderArr.filter((no) => +no !== +trelloNo)
    await db.query(`UPDATE trellos_order SET list_order = '${updateOrder.join()}' WHERE board_no = ${boardNo}`) // prettier-ignore
    res.status(200).json({ message: 'success delete', trelloNo: +trelloNo })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}
