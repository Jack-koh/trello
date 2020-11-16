import React, { useState } from 'react'
import { MdPersonOutline } from 'react-icons/md'
import { Modal } from 'components/custom/Elements'
import ModalCreateBoard from 'components/modal/createBoard/ModalCreateBoard'
import BoardsList from 'components/main/boards/list/BoardsList'
import CreateBoard from 'components/main/boards/modal/Modal_CreateBoard'
import './BoardsContent.scss'

function BoardsContent() {
  const [dialog, setDialog] = useState(false)
  const toggleHandler = () => setDialog(!dialog)

  return (
    <div className="board_inner_area">
      <div className="board_section">
        <div className="board_title">
          <MdPersonOutline />
          <span>Personal Boards</span>
        </div>
        <ul className="board_item_section">
          <BoardsList />
          <Modal
            content={<ModalCreateBoard closeHandler={toggleHandler} />}
            closeOutside={toggleHandler}
            open={dialog}
          >
            <CreateBoard openHandler={toggleHandler} />
          </Modal>
        </ul>
      </div>
    </div>
  )
}

export default BoardsContent
