import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { MdClose } from "react-icons/md";

import classNames from 'classnames/bind'
import styles from './Dialog_create_board.module.scss'

import Backdrop from 'components/modal/Backdrop'
const cx = classNames.bind(styles)

function ModalCreateBoard(props) {
  const [boardTitle, setBoardTitle] = useState('')
  const [bgName, setBgName] = useState('bg-forest')
  const [teams, setTeams] = useState(false)

  const createBoardHandler = (e) => {
    e.preventDefault();
    const background = backgroundList.find(el => el.name === bgName)
    const param = {
      title: boardTitle,
      background: background,
      teams: teams,
      userNo: props.userNo,
    }

    props.onCreateBoard(param)
    // props.onClose()
  }

  const closeModalHandler = () => {
    props.onClose()
  }

  const setBgHandler = bgName => {
    setBgName(bgName)
  }

  const backgroundList = [
    { type: 'image', name: 'bg-forest', url: 'https://images.unsplash.com/photo-1500762728065-466b7a170c96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
    { type: 'image', name: 'bg-sandcave', url: 'https://images.unsplash.com/photo-1444076784383-69ff7bae1b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
    { type: 'image', name: 'bg-bird', url: 'https://images.unsplash.com/photo-1578279043004-e218349bfdfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' },
    { type: 'image', name: 'bg-mountain', url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    { type: 'color', name: 'bg-blue' },
    { type: 'color', name: 'bg-yellow' },
    { type: 'color', name: 'bg-green' },
    { type: 'color', name: 'bg-brown' },
    { type: 'color', name: 'bg-brown' }
  ]

  const backgroundEl = backgroundList.map((item, i) => {
    return (
      <li key={i} className={cx('choice-card', item.name)} onClick={() => setBgHandler(item.name)} />
    )
  })

  return (
    <Fragment>
      <div className={cx('create-board-modal')}>
        <form onSubmit={createBoardHandler}>
          <div className={cx('set-board')}>
            <div className={cx('board-card', bgName)}>
              <MdClose onClick={closeModalHandler} />
              <input
                type='text'
                placeholder="Add board title"
                value={boardTitle}
                onChange={e => setBoardTitle(e.target.value)} />

            </div>
            <ul className={cx('card-background')}>
              {backgroundEl}
            </ul>
          </div>

          <div className={cx('bottom-utils')}>
            <button disabled={boardTitle.length === 0}>Create Board</button>
          </div>
        </form>
      </div>
      <Backdrop />
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => dispatch(actions.closeModal()),
    onCreateBoard: param => dispatch(actions.createBoardStart(param))
  }
}

const mapStateToProps = state => {
  return {
    userNo: state.auth.userNo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCreateBoard);