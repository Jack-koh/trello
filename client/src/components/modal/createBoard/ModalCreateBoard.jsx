import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as action from 'store/actions'
import { MdClose } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import './ModalCreateBoard.scss'

import { Button, Modal } from 'components/custom/Elements'

function DialogCreateBoard(props) {
  const boardList = useSelector(state => state.board.list)
  const loading = useSelector(state => state.board.createLoading)
  const dispatch = useDispatch()
  const onCreateBoard = payload => dispatch(action.createBoardItemStart(payload))

  const { closeHandler, history } = props
  const isFirstRun = useRef(true)
  const [boardTitle, setBoardTitle] = useState('')
  const [bgName, setBgName] = useState('bg_forest')

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      closeHandler()
      const trello = JSON.parse(localStorage.getItem('trello'))
      history.push(`/board/${trello.title}`)
    }
  }, [closeHandler, history, boardList])

  const backgroundList = [
    { type: 'image', name: 'bg_forest' },
    { type: 'image', name: 'bg_sandcave' },
    { type: 'image', name: 'bg_bird' },
    { type: 'image', name: 'bg_mountain' },
    { type: 'color', name: 'bg-blue' },
    { type: 'color', name: 'bg-yellow' },
    { type: 'color', name: 'bg-green' },
    { type: 'color', name: 'bg-brown' },
    { type: 'color', name: 'bg-brown' }
  ]

  const setBgHandler = item => {
    setBgName(item.name)
  }

  const createBoardSubmit = async e => {
    e.preventDefault()
    const background = backgroundList.find(el => el.name === bgName)
    const userData = JSON.parse(localStorage.getItem('user-data'))
    const payload = {
      userNo: userData.userNo,
      userEmail: userData.email,
      userName: userData.name,
      title: boardTitle,
      background,
      favorite: false
    }
    onCreateBoard(payload)
  }

  const setBackgroundHandler = item => {
    setBgHandler(item)
  }

  const backgroundEl = backgroundList.map((item, i) => {
    return (
      <li key={i} className="choose_background_item" onClick={setBackgroundHandler.bind(this, item)}>
        <div className={item.name}>{item.name === bgName ? <FaCheck /> : null}</div>
      </li>
    )
  })

  return (
    <Modal className="create_board_dialog" close={closeHandler}>
      <form onSubmit={createBoardSubmit}>
        <div className="set_board">
          <div className={`board_card ${bgName}`}>
            <MdClose onClick={closeHandler} />
            <input
              type="text"
              placeholder="Add board title"
              value={boardTitle}
              onChange={e => setBoardTitle(e.target.value)}
            />
          </div>
          <ul className="choose_background">{backgroundEl}</ul>
        </div>

        <div className="bottom_utils">
          <Button
            className="green_submit"
            type="submit"
            text="Create Board"
            loading={loading}
            disabled={boardTitle.length === 0}
          />
        </div>
      </form>
    </Modal>
  )
}

export default withRouter(DialogCreateBoard)
