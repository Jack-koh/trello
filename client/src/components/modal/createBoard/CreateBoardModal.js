import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from 'store/actions'
import { MdClose } from "react-icons/md";

import classNames from 'classnames/bind'
import styles from './CreateBoardModal.module.scss'

import Backdrop from 'components/modal/Backdrop'
const cx = classNames.bind(styles)

function ModalCreateBoard(props) {
  const [boardName, setBoardName] = useState('')
  const [background, setBackground] = useState('bg-blue')

  const createBoardHandler = () => {
    console.log('check')
  }

  const closeModalHandler = () => {
    props.onClose()
  }

  const setBgHandler = bgName => {
    setBackground(bgName)
  }

  const backgroundList = [
    { type: 'image', name: '', url: '' },
    { type: 'image', name: '', url: '' },
    { type: 'image', name: '', url: '' },
    { type: 'image', name: '', url: '' },
    { type: 'color', name: 'bg-blue', url: null },
    { type: 'color', name: 'bg-yellow', url: null },
    { type: 'color', name: 'bg-green', url: null },
    { type: 'color', name: 'bg-brown', url: null },
    { type: 'color', name: 'bg-brown', url: null }
  ]

  const backgroundEl = backgroundList.map((item, i) => {
    return (
      <li key={i} className={cx('choice-card', item.name)} onClick={() => setBgHandler(item.name)} />
    )
  })

  return (
    <Fragment>
      <div className={cx('create-board-modal')}>
        <div className={cx('set-board')}>
          <div className={cx('board-card', background)}>
            <MdClose onClick={closeModalHandler} />
            <form onSubmit={createBoardHandler}>
              <input
                type='text'
                placeholder="Add board title"
                value={boardName}
                onChange={e => setBoardName(e.target.value)} />
            </form>
          </div>
          <ul className={cx('card-background')}>
            {backgroundEl}
          </ul>
        </div>

        <div className={cx('bottom-utils')}>
          <button disabled={boardName.length === 0}>Creat Board</button>
        </div>
      </div>
      <Backdrop />
    </Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => dispatch(actions.closeModal())
  }
}

export default connect(null, mapDispatchToProps)(ModalCreateBoard);