import React from 'react';
import './Modal_CreateBoard.scss';

function Modal_CreateBoard({ openHandler }) {
  return (
    <li className="create_board bg-gray">
      <div onClick={openHandler}>
        <div className="create_board_inner">
          <span className="create_item_title">Create new board</span>
        </div>
        <div className="create_hover_action" />
      </div>
    </li>
  );
}

export default Modal_CreateBoard;
