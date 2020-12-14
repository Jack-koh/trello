import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { MdStarBorder, MdStar } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import * as actions from 'store/actions';
import classNames from 'classnames';
import './TrelloPage.scss';

import TrelloList from 'components/trello/TrelloList';
import CreateTrello from 'components/trello/CreateTrello';
import GlobalLayout from 'layout/global/GlobalLayout';

function TrelloPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const onGetTelloList = useCallback((boardNo) => dispatch(actions.getTrelloListStart(boardNo)), [
    dispatch,
  ]);
  const unMount = useCallback(() => dispatch(actions.initTrelloList()), [dispatch]);

  const [favorite, setFavorite] = useState(false);
  const trello = JSON.parse(localStorage.getItem('trello'));
  const { title, boardNo, backgroundName } = trello;

  useEffect(() => {
    trello ? onGetTelloList(boardNo) : history.go(-1);
    return () => unMount();
  }, []);

  const mounseDownHandler = (e) => {
    e.stopPropagation();
    const target = document.getElementById('trello-items');
    const listWrapper = document.getElementById('trello-list-wrapper');
    const trelloItem = document.getElementById('trello-item');

    if (
      target.clientWidth <= listWrapper.clientWidth &&
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

  return (
    <GlobalLayout mode="trello">
      <div id="trello-screen" className={classNames({ [backgroundName]: backgroundName })}>
        <section className="trello-header">
          <div className="trello-setting">
            <div className="board-title">{title}</div>
            <div
              className={classNames('trello-favorite', { favorite: favorite })}
              onClick={() => setFavorite(!favorite)}
            >
              {favorite ? <MdStar /> : <MdStarBorder />}
            </div>
            <div className="trello-trans-box">Invite</div>
          </div>
          <div className="trello-menu">
            <div className="trello-trans-box">Delete Board</div>
          </div>
        </section>

        <section id="trello-content-ref" className="trello-content" onMouseDown={mounseDownHandler}>
          <div id="trello-items">
            <TrelloList />
            <CreateTrello />
          </div>
        </section>
      </div>
    </GlobalLayout>
  );
}

export default TrelloPage;
