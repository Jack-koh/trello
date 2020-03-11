import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from 'store/actions'
import { MdClose } from 'react-icons/md'
import { FaCheck } from 'react-icons/fa'
import './Dialog_create_board.scss'

import BtnLoading from 'shared/btnLoading/BtnLoading'
import Backdrop from 'components/dialog/Backdrop'
import { utilSetVisible } from 'shared/utility'

export const utilSetVisibility = utilSetVisible

function DialogCreateBoard(props) {
  const { setVisibility, closeDialog, history, list, loading } = props
  const wrapperRef = useRef(null)
  const isFirstRun = useRef(true)
  const [boardTitle, setBoardTitle] = useState('')
  const [bgName, setBgName] = useState('bg_forest')

  useEffect(() => {
    const clickOutsideHandler = e => {
      if (wrapperRef.current.contains(e.target)) return
      setVisibility(e)
    }
    document.addEventListener('click', clickOutsideHandler, true)
    return () => {
      document.removeEventListener('click', clickOutsideHandler, true)
    }
  }, [setVisibility])

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
    } else {
      closeDialog()
      const trello = JSON.parse(localStorage.getItem('trello'))
      history.push(`/board/${trello.title}`)
    }
  }, [closeDialog, history, list])

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

  const createBoardHandler = async e => {
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
    props.onCreateBoard(payload)
  }

  const setBackgroundHandler = item => {
    console.log(item)
    setBgHandler(item)
  }

  const backgroundEl = backgroundList.map((item, i) => {
    return (
      <li
        key={i}
        className="choose_background_item"
        onClick={setBackgroundHandler.bind(this, item)}
      >
        <div className={item.name}>{item.name === bgName ? <FaCheck /> : null}</div>
      </li>
    )
  })

  return (
    <>
      <div className="create_board_dialog" ref={wrapperRef}>
        <form onSubmit={createBoardHandler}>
          <div className="set_board">
            <div className={`board_card ${bgName}`}>
              <MdClose onClick={closeDialog} />
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
            <button type="submit" disabled={boardTitle.length === 0}>
              {loading ? <BtnLoading /> : 'Create Board'}
            </button>
          </div>
        </form>
      </div>
      <Backdrop />
    </>
  )
}

const mapStateToProps = state => {
  return {
    list: state.boards.list,
    loading: state.boards.createLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCreateBoard: payload => dispatch(actions.createBoardStart(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DialogCreateBoard))
