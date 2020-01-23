import React from 'react'
import { MdPersonOutline } from "react-icons/md";

import BoardItem from './boardItem/BoardItem'

import classNames from 'classnames/bind'
import style from './Boards.module.scss'
const cx = classNames.bind(style)

const Board = () => {

  const boardList = [
    {
      name: 'jack',
      background: 'bg-green'
    },
    {
      name: 'accounts',
      background: 'bg-yellow'
    },
    {
      name: 'test',
      background: 'bg-blue'
    }
  ]

  return (
    <div className={cx('board-wrap')}>
      <div className={cx('board-inner-area')}>
        <div className={cx('board-section')}>
          <div className={cx('board-title')}>
            <MdPersonOutline />
            <span>Personal Boards</span>
          </div>
          <BoardItem list={boardList} />
        </div>
      </div>
    </div>
  )
}

export default Board