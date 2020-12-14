const db = require('../db')

exports.create = async (req, res, next) => {
  const { trelloNo, title } = req.body
  try {
    const query = await db.query(`INSERT INTO cards VALUES(DEFAULT, '${title}', '', '', extract(epoch from now()), '${trelloNo}') RETURNING *`) //prettier-ignore
    const item = query.rows[0]

    const orderQuery = await db.query(`SELECT * FROM cards_order WHERE trello_no = '${trelloNo}'`)
    const orderTarget = orderQuery.rows[0]
    let insertOrder = ''
    if (orderTarget.list_order) {
      const orderArr = orderTarget.list_order.split(',')
      orderArr.push(item.card_no)
      orderArr.join()
      insertOrder = orderArr.join()
    } else {
      insertOrder = item.card_no
    }

    await db.query(`UPDATE cards_order SET list_order = '${insertOrder}' WHERE trello_no = '${trelloNo}'`) //prettier-ignore

    res.status(200).json({
      item: {
        cardNo: item.card_no,
        title: item.title,
        description: '',
        label: '',
        regDate: item.reg_date,
        trelloNo: item.trello_no,
      },
    })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.drag = async (req, res, next) => {
  const { item, source, destination } = req.body

  try {
    if (source.trelloNo === destination.trelloNo) {
      const orderQuery = await db.query(`SELECT * FROM cards_order WHERE trello_no =  '${item.trelloNo}'`)
      const orderArr = orderQuery.rows[0].list_order.split(',')
      orderArr.splice(source.index, 1)
      orderArr.splice(destination.index, 0, item.cardNo.toString())
      await db.query(`UPDATE cards_order SET list_order = '${orderArr.join()}' WHERE trello_no = '${item.trelloNo}'`) // prettier-ignore
    } else {
      // source query ################################################
      const sourceQuery = await db.query(`SELECT * FROM cards_order WHERE trello_no =  '${source.trelloNo}'`)
      const sourceOrderArr = sourceQuery.rows[0].list_order.split(',')
      sourceOrderArr.splice(source.index, 1)

      sourceOrderArr.length
        ? await db.query(`UPDATE cards_order SET list_order = '${sourceOrderArr.join()}' WHERE trello_no = '${source.trelloNo}'`) // prettier-ignore
        : await db.query(`UPDATE cards_order SET list_order = null WHERE trello_no = '${source.trelloNo}'`)

      // dest query ################################################
      let insertDestOrder = item.cardNo.toString()
      const destQuery = await db.query(`SELECT * FROM cards_order WHERE trello_no =  '${destination.trelloNo}'`) // prettier-ignore
      const destListOrder = destQuery.rows[0].list_order
      if (!!destListOrder) {
        const destOrderArr = destListOrder.split(',')
        destOrderArr.splice(destination.index, 0, item.cardNo.toString())
        insertDestOrder = destOrderArr.join()
      }
      await db.query(`UPDATE cards_order SET list_order = '${insertDestOrder}' WHERE trello_no = '${destination.trelloNo}'`) // prettier-ignore
      await db.query(`UPDATE cards SET trello_no = '${destination.trelloNo}' WHERE card_no = '${item.cardNo}'`) // prettier-ignore
    }

    res.status(200).json({ message: 'Card drag success!' })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}

exports.update = async (req, res, next) => {
  const { cardNo, title, label, description } = req.body

  try {
    await db.query(
      `UPDATE cards SET title = '${title}', label = '${label}', description = '${description}' WHERE card_no = '${cardNo}'`
    )
    res.status(200).json({ message: 'Card update success!' })
  } catch (err) {
    if (!err.statusCode) err.statusCode = 500
    next(err)
  }
}
