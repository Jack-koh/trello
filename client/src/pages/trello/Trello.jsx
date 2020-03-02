import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { MdStarBorder, MdStar } from 'react-icons/md'
import * as actions from 'store/actions'
import './Trello.scss'

import TrelloList from 'components/trello/TrelloList'
import CreateList from 'components/trello/CreateList'

function Board(props) {
  const { onGetTelloList } = props
  const [favorite, setFavorite] = useState(false)
  const [trello] = useState(JSON.parse(localStorage.getItem('trello')))

  useEffect(() => {
    onGetTelloList({ boardNo: trello.boardNo })
  }, [onGetTelloList, trello.boardNo])

  const setFavoriteHandler = () => {
    setFavorite(!favorite)
  }

  return (
    <main className={`trello_screen ${trello && trello.background.name}`}>
      <section className="trello_header">
        <div className="trello_setting">
          <div className="trello_title">{trello && trello.title}</div>
          <div className={`trello_favorite ${favorite}`} onClick={setFavoriteHandler}>
            {favorite ? <MdStar /> : <MdStarBorder />}
          </div>
          <div className="trello_trans_box">Invite</div>
        </div>
        <div className="trello_menu">
          <div className="trello_trans_box">Show Menu</div>
        </div>
      </section>
      <section className="trello_content">
        <div className="trello_items">
          <TrelloList />
          <CreateList />
        </div>
      </section>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    trelloList: state.trello.list
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onGetTelloList: params => dispatch(actions.getTrelloListStart(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(Board)
