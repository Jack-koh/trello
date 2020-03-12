import React from 'react'
import { MdPersonOutline } from 'react-icons/md'
import './Board.scss'
import BoardList from './boardList/BoardList'
import CreateBoard from './createBoard/CreateBoard'

function Board() {
  return (
    <section className="board_wrap">
      <div className="board_inner_area">
        <div className="board_section">
          <div className="board_title">
            <MdPersonOutline />
            <span>Personal Boards</span>
          </div>
          <ul className="board_item_section">
            <BoardList />
            <CreateBoard />
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Board
