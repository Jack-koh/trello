import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'store/actions';
import './BoardsList.scss';
import { MdStarBorder } from 'react-icons/md';
import classNames from 'classnames';

function BoardsList() {
  const { list } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const onGetboardList = useCallback(() => dispatch(actions.getBoardListStart()), [dispatch]);
  const onInitBoardList = useCallback(() => dispatch(actions.initBoardList()), [dispatch]);

  const onEnterBoardHandler = (item) => {
    localStorage.setItem('trello', JSON.stringify(item));
  };

  useEffect(() => {
    onGetboardList();
    return () => onInitBoardList();
  }, []);

  const onFavoriteHandler = (item) => {
    console.log('favorite');
  };

  return list.map((item, i) => {
    const { title, backgroundName } = item;
    return (
      <li key={i} className={classNames('board_item', { [backgroundName]: backgroundName })}>
        <Link to={`/main/trello/${title}`} onClick={() => onEnterBoardHandler(item)}>
          <div className="board_item_inner">
            <span className="item_title">{title}</span>
          </div>
        </Link>
        <MdStarBorder onClick={() => onFavoriteHandler(item)} />
      </li>
    );
  });
}

export default BoardsList;
