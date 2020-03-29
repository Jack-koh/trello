import React from 'react';
import './CreateBoard.scss';

function CreateBoard({ openHandler }) {
  return (
    <>
      <li className="create_board bg_gray">
        <div onClick={openHandler}>
          <div className="create_board_inner">
            <span className="create_item_title">Create new board</span>
          </div>
          <div className="create_hover_action" />
        </div>
      </li>
      {/* {dialog && <ModalCreateBoard closeHandler={() => setDialog(false)} />} */}
    </>
  );
}

export default CreateBoard;
