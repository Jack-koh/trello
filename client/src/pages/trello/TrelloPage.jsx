import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdClose, MdStarBorder, MdStar } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import * as actions from 'store/actions';
import classNames from 'classnames';
import { Popover, Input } from 'components/custom';
import Popover_DeleteBoard from './popover/Popover_DeleteBoard';
import './TrelloPage.scss';

import TrelloList from 'components/trello/TrelloList';
import CreateTrello from 'components/trello/CreateTrello';
import GlobalLayout from 'layout/global/GlobalLayout';

function TrelloPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onGetTelloList = useCallback((boardNo) => dispatch(actions.getTrelloListStart(boardNo)), [dispatch]); // prettier-ignore
  const onUpdateBoard = useCallback((item) => dispatch(actions.updateBoardItemStart(item)), [dispatch]); // prettier-ignore
  const unMount = useCallback(() => dispatch(actions.initTrelloList()), [dispatch]);
  const inputRef = useRef();
  const [favorite, setFavorite] = useState(false);
  const [titleFocus, setTitleFocus] = useState(false);
  const initialBoard = {
    title: '',
    boardNo: -1,
    backgroundName: '',
    backgroundType: '',
  };
  const [defaultBoard, setDefaultBoard] = useState(initialBoard);
  const [board, setBoard] = useState(initialBoard);
  const [bgModify, setbgModify] = useState(false);
  const { title, boardNo, backgroundName } = board;

  useEffect(() => {
    const localBoard = JSON.parse(localStorage.getItem('trello'));
    setBoard(localBoard);
    setDefaultBoard(localBoard);
    localBoard ? onGetTelloList(localBoard.boardNo) : history.push('/main/board');
    return () => unMount();
  }, []);

  const mounseDownHandler = (e) => {
    e.stopPropagation();
    const target = document.getElementById('trello-items');
    const trelloItem = document.getElementById('trello-item');
    const listWrapper = document.getElementById('trello-list-wrapper');

    if (
      target.clientWidth <= listWrapper.clientWidth + listWrapper.clientWidth &&
      !trelloItem.contains(e.target) &&
      target.contains(e.target)
    ) {
      const pos = { clientX: e.clientX, left: target.scrollLeft };
      const mouseMoveHandler = (e) => {
        target.scrollLeft = target.scrollLeft + (e.clientX - pos.clientX) * -1;
        pos.clientX = e.clientX;
      };

      const mouseUpHandler = () => window.removeEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mousemove', mouseMoveHandler);
      window.addEventListener('mouseup', mouseUpHandler);
    }
  };

  const updateBoardTitleHandler = () => {
    if (!title) setBoard({ ...board, title: defaultBoard.title });
    if (title && title !== defaultBoard.title) {
      onUpdateBoard(board);
      setDefaultBoard(board);
      localStorage.setItem('trello', JSON.stringify(board));
    }
    setTitleFocus(false);
  };

  const updateBoardBackgroundHandler = (backgroundName) => {
    if (backgroundName !== defaultBoard.backgroundName) {
      const payload = { ...board, backgroundName };
      setBoard(payload);
      setDefaultBoard(payload);
      onUpdateBoard(payload);
      localStorage.setItem('trello', JSON.stringify(payload));
    }
    setTitleFocus(false);
  };

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

  return (
    <GlobalLayout mode="trello">
      <div id="trello-screen" className={classNames({ [backgroundName]: backgroundName })}>
        <section className="trello-header">
          <div className="trello-setting">
            <div className="bord-title-field">
              <Input
                className={classNames('bord-title-input', { focus: titleFocus })}
                innerRef={inputRef}
                value={title}
                onChange={(e) => setBoard({ ...board, title: e.target.value })}
                onKeyEnter={updateBoardTitleHandler}
                onBlur={updateBoardTitleHandler}
              />
              <div
                className="board-title"
                onClick={() => {
                  setTitleFocus(true);
                  inputRef.current.focus();
                  inputRef.current.setSelectionRange(0, inputRef.current.value.length);
                }}
              >
                {title}
              </div>
            </div>
            <div
              className={classNames('trello-favorite', { favorite: favorite })}
              onClick={() => setFavorite(!favorite)}
            >
              {favorite ? <MdStar /> : <MdStarBorder />}
            </div>
          </div>

          <div className="trello-menu">
            <div className="trello-trans-box" onClick={() => setbgModify(!bgModify)}>
              Change background
            </div>
            <Popover
              position="bottom right"
              clickOutside
              content={<Popover_DeleteBoard boardNo={boardNo} title={title} />}
            >
              <div className="trello-trans-box">Delete Board</div>
            </Popover>
          </div>
        </section>

        <section className="trello-content" onMouseDown={mounseDownHandler}>
          <div id="trello-items">
            <TrelloList />
            <CreateTrello />
          </div>
        </section>

        <section id="background-change-field" className={classNames({ show: bgModify })}>
          <div className="bg-change-head">
            Photos by
            <a
              href="https://unsplash.com/?utm_source=trello&utm_medium=referral&utm_campaign=api-credit"
              target="_blank"
            >
              {`Unsplash`}
            </a>
            <div className="close-button">
              <MdClose onClick={() => setbgModify(false)} />
            </div>
          </div>
          <hr />

          <ul className="background-list-field">
            {backgroundList.map((item, i) => {
              return (
                <li key={i}>
                  <div
                    className={classNames('background-item', { [item.name]: item.name })}
                    onClick={() => updateBoardBackgroundHandler(item.name)}
                  >
                    <div className="background-name">{item.name}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </GlobalLayout>
  );
}

export default TrelloPage;
