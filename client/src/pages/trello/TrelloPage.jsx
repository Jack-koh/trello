import React, { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdStarBorder, MdStar } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import * as actions from 'store/actions'
import classNames from 'classnames'
import './TrelloPage.scss'

import TrelloList from 'components/trello/TrelloList'
import CreateTrello from 'components/trello/CreateTrello'
import GlobalLayout from 'layout/global/GlobalLayout'

function TrelloPage() {
  const history = useHistory()
  const dispatch = useDispatch()
  const onGetTelloList = useCallback((boardNo) => dispatch(actions.getTrelloListStart(boardNo)), [dispatch])
  const unMount = useCallback(() => dispatch(actions.initTrelloList()), [dispatch])

  const [favorite, setFavorite] = useState(false)
  const trello = JSON.parse(localStorage.getItem('trello'))
  const { title, boardNo, backgroundName } = trello

  useEffect(() => {
    trello ? onGetTelloList(boardNo) : history.go(-1)
    return () => {
      unMount()
      // localStorage.removeItem('trello')
    }
  }, [])

  return (
    <GlobalLayout mode="trello">
      <div className={classNames('trello-screen', { [backgroundName]: backgroundName })}>
        <section className="trello-header">
          <div className="trello-setting">
            <div className="trello-title">{title}</div>
            <div
              className={classNames('trello-favorite', { favorite: favorite })}
              onClick={() => setFavorite(!favorite)}
            >
              {favorite ? <MdStar /> : <MdStarBorder />}
            </div>
            <div className="trello-trans-box">Invite</div>
          </div>
          <div className="trello-menu">
            <div className="trello-trans-box">Delete Board</div>
          </div>
        </section>

        <section className="trello-content">
          <div className="trello-items">
            <TrelloList />
            <CreateTrello />
          </div>
        </section>
      </div>
    </GlobalLayout>
  )
}

export default TrelloPage
