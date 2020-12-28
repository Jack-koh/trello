import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from 'store/actions';
import './BoardsList.scss';
import { MdStar, MdStarBorder } from 'react-icons/md';
import classNames from 'classnames';

function BoardsList() {
  const list = useSelector((state) => state.board.list);

  const dispatch = useDispatch();
  const onGetboardList = useCallback(() => dispatch(actions.getBoardListStart()), [dispatch]);
  const onInitBoardList = useCallback(() => dispatch(actions.initBoardList()), [dispatch]);

  useEffect(() => {
    onGetboardList();
    return () => onInitBoardList();
  }, []);

  return list.map((item, i) => {
    return <BoardItem key={i} item={item} />;
  });
}

export default BoardsList;

const BoardItem = ({ item }) => {
  const dispatch = useDispatch();
  const onUpdateBoard = useCallback((item) => dispatch(actions.updateBoardItemStart(item)), [dispatch]); // prettier-ignore
  const { title, backgroundName, favorite: defaultFavorite } = item;
  const [favorite, setFavorite] = useState(defaultFavorite);
  const onEnterBoardHandler = () => {
    localStorage.setItem('trello', JSON.stringify(item));
  };

  const onFavoriteHandler = () => {
    onUpdateBoard({ ...item, favorite: !favorite });
    setFavorite(!favorite);
  };

  return (
    <li className={classNames('board_item', { [backgroundName]: backgroundName })}>
      <Link to={`/main/trello/${title}`} onClick={onEnterBoardHandler}>
        <div className="board_item_inner">
          <span className="item_title">{title}</span>
        </div>
      </Link>
      <div
        className={classNames('board-favorite', { favorite: favorite })}
        onClick={onFavoriteHandler}
      >
        {favorite ? <MdStar /> : <MdStarBorder />}
      </div>
    </li>
  );
};
