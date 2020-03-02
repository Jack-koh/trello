import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from 'store/actions'
import './BoardItems.scss'
import { MdStarBorder } from 'react-icons/md'

const BoardItems = props => {
  const { boardItems, onGetBoardItem, history } = props

  useEffect(() => {
    onGetBoardItem()
  }, [onGetBoardItem])

  const onEnterTrelloHandler = item => {
    history.push(`/board/${item.title}`)
    localStorage.setItem('trello', JSON.stringify(item))
  }

  const onFavoriteHandler = e => {
    e.stopPropagation()
  }

  const itemEl =
    boardItems &&
    boardItems.map((item, i) => {
      return (
        <li key={i} className={`board_item ${item.background.name}`}>
          <div onClick={onEnterTrelloHandler.bind(this, item)}>
            <div className="board_item_inner">
              <span className="item_title">{item.title}</span>
            </div>
            <div className="board_hover_action">
              <MdStarBorder onClick={e => onFavoriteHandler(e, item)} />
            </div>
          </div>
        </li>
      )
    })
  return <>{boardItems && !!boardItems.length && itemEl}</>
}

const mapStateToProps = state => {
  return {
    boardItems: state.boards.list
  }
}

const mapDispatchToProp = dispatch => {
  return {
    onGetBoardItem: () => {
      dispatch(actions.getBoardsStart())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProp)(withRouter(BoardItems))