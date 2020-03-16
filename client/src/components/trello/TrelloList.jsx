import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as action from 'store/actions'
import './TrelloList.scss'

import TrelloItem from './trelloItem/TrelloItem'

function TrelloList(props) {
  const {
    onGetTelloList,
    onInitTrelloList,
    onGetCardList,
    onInitCardList,
    trelloList,
    cardList
  } = props
  const [trello] = useState(JSON.parse(localStorage.getItem('trello')))

  useEffect(() => {
    const { boardNo } = trello
    onGetTelloList(boardNo)
    onGetCardList(boardNo)

    return () => {
      onInitTrelloList()
      onInitCardList()
    }
  }, [onGetTelloList, onInitTrelloList, onGetCardList, onInitCardList, trello])

  const trelloListEl = trelloList.map((trelloData, i) => {
    return (
      <article key={i} className="trello_list_wrapper">
        <TrelloItem
          trelloData={trelloData}
          cardList={cardList.filter(el => el.trelloNo === trelloData.trelloNo)}
        />
      </article>
    )
  })

  return trelloListEl
}

const mapStateToProps = state => {
  return {
    trelloList: state.trello.list,
    cardList: state.card.list
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onGetTelloList: boardNo => dispatch(action.getTrelloListStart(boardNo)),
    onInitTrelloList: () => dispatch(action.initTrelloList()),
    onGetCardList: boardNo => dispatch(action.getCardListStart(boardNo)),
    onInitCardList: () => dispatch(action.initCardList())
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(TrelloList)
