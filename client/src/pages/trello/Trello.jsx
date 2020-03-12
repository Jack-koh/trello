import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { MdStarBorder, MdStar } from 'react-icons/md'
import * as action from 'store/actions'
import './Trello.scss'

import TrelloList from 'components/trello/TrelloList'
import CreateTrelloItem from 'components/trello/CreateTrelloItem'

function Trello(props) {
  const { onGetTelloList, onInitTrelloList } = props
  const [favorite, setFavorite] = useState(false)
  const [trello] = useState(JSON.parse(localStorage.getItem('trello')))

  useEffect(() => {
    onGetTelloList(trello.boardNo)

    return () => {
      onInitTrelloList()
    }
  }, [onGetTelloList, onInitTrelloList, trello.boardNo])

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
          <CreateTrelloItem />
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
    onGetTelloList: params => dispatch(action.getTrelloListStart(params)),
    onInitTrelloList: () => dispatch(action.initTrelloList())
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(Trello)
