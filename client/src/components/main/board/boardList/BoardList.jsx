import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as action from 'store/actions';
import './BoardList.scss';
import { MdStarBorder } from 'react-icons/md';

function BoardList() {
  const history = useHistory();
  const boardList = useSelector((state) => state.board.list);
  const dispatch = useDispatch();
  const onGetboardList = useCallback(() => dispatch(action.getBoardListStart()), [dispatch]);
  const onInitBoardList = useCallback(() => dispatch(action.initBoardList()), [dispatch]);

  useEffect(() => {
    onGetboardList();
    return () => onInitBoardList();
  }, [onGetboardList, onInitBoardList]);

  const onEnterTrelloHandler = (item) => {
    history.push(`/board/${item.title}`);
    localStorage.setItem('trello', JSON.stringify(item));
  };

  const onFavoriteHandler = (e) => {
    e.stopPropagation();
  };

  const boardItems =
    boardList &&
    boardList.map((item, i) => {
      return (
        <li key={i} className={`board_item ${item.background.name}`}>
          <div onClick={() => onEnterTrelloHandler(item)}>
            <div className="board_item_inner">
              <span className="item_title">{item.title}</span>
            </div>
            <div className="board_hover_action">
              <MdStarBorder onClick={(e) => onFavoriteHandler(e, item)} />
            </div>
          </div>
        </li>
      );
    });
  return <>{boardItems}</>;
}

export default BoardList;
