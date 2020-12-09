import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from 'store/actions';
import { MdClose } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import './ModalCreateBoard.scss';

import { Button } from 'components/custom/Elements';

function ModalCreateBoard({ closeHandler, history }) {
  const boardList = useSelector((state) => state.board.list);
  const loading = useSelector((state) => state.board.createLoading);
  const dispatch = useDispatch();
  const onCreateBoard = (payload) => dispatch(actions.createBoardItemStart(payload));

  const isFirstRun = useRef(true);
  const [boardTitle, setBoardTitle] = useState('');
  const [bgName, setBgName] = useState('bg_forest');

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else {
      closeHandler();
      const trello = JSON.parse(localStorage.getItem('trello'));
      history.push(`/board/${trello.title}`);
    }
  }, [closeHandler, history, boardList]);

  const backgroundList = [
    { type: 'image', name: 'bg_forest' },
    { type: 'image', name: 'bg_sandcave' },
    { type: 'image', name: 'bg_bird' },
    { type: 'image', name: 'bg_mountain' },
    { type: 'color', name: 'bg-blue' },
    { type: 'color', name: 'bg-yellow' },
    { type: 'color', name: 'bg-green' },
    { type: 'color', name: 'bg-brown' },
    { type: 'color', name: 'bg-brown' },
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
