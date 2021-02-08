import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { boardActions } from 'store/actions';
import { MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import './ModalCreateBoard.scss';

import { Button } from 'components/custom';

function ModalCreateBoard({ closeHandler, history }) {
  const loading = useSelector((state) => state.board.createLoading);
  const dispatch = useDispatch();
  const onCreateBoard = (payload) => dispatch(boardActions.create(payload));

  const [boardTitle, setBoardTitle] = useState('');
  const [bgName, setBgName] = useState('bg-forest');

  const backgroundList = [
    { type: 'image', name: 'bg-forest' },
    { type: 'image', name: 'bg-sandcave' },
    { type: 'image', name: 'bg-bird' },
    { type: 'image', name: 'bg-mountain' },
    { type: 'color', name: 'bg-blue' },
    { type: 'color', name: 'bg-yellow' },
    { type: 'color', name: 'bg-green' },
    { type: 'color', name: 'bg-brown' },
    { type: 'color', name: 'bg-pink' },
  ];

  const createBoardSubmit = async (e) => {
    e.preventDefault();
    const { type, name } = backgroundList.find((el) => el.name === bgName);
    const { userNo } = JSON.parse(localStorage.getItem('user-data'));

    const payload = {
      userNo,
      title: boardTitle,
      backgroundType: type,
      backgroundName: name,
      favorite: false,
    };
    onCreateBoard(payload);
  };

  const backgroundEl = backgroundList.map((item, i) => {
    return (
      <li key={i} className="choose_background_item" onClick={() => setBgName(item.name)}>
        <div className={item.name}>{item.name === bgName ? <FaCheck /> : null}</div>
      </li>
    );
  });

  return (
    <div className="board-modal-inner">
      <form onSubmit={createBoardSubmit}>
        <div className="set_board">
          <div className={`board_card ${bgName}`}>
            <MdClose onClick={closeHandler} />
            <input
              type="text"
              placeholder="Add board title"
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              spellCheck="false"
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
    </div>
  );
}

export default withRouter(ModalCreateBoard);
