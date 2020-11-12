import React, { useState } from 'react';
import { MdPersonOutline } from 'react-icons/md';
import './Board.scss';
import { Modal } from 'components/custom/Elements';
import ModalCreateBoard from 'components/modal/createBoard/ModalCreateBoard';
import BoardList from './boardList/BoardList';
import CreateBoard from './createBoard/CreateBoard';

function Board() {
  const [dialog, setDialog] = useState(false);
  const toggleHandler = () => setDialog(!dialog);

  return (
    <>
      <div className="board_inner_area">
        <div className="board_section">
          <div className="board_title">
            <MdPersonOutline />
            <span>Personal Boards</span>
          </div>
          <ul className="board_item_section">
            <BoardList />
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
    </>
  );
}

export default Board;
