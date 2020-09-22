import React, { useState, useEffect } from 'react';

import { MdStarBorder, MdStar } from 'react-icons/md';
import './TrelloPage.scss';

import TrelloList from 'components/trello/TrelloList';
import CreateTrelloItem from 'components/trello/CreateTrelloItem';
import GnbLayout from 'hoc/layout/gnb/GnbLayout';

function TrelloPage() {
  const [favorite, setFavorite] = useState(false);
  const [trello] = useState(JSON.parse(localStorage.getItem('trello')));

  useEffect(() => () => localStorage.removeItem('trello'), []);

  return (
    <GnbLayout>
      <div className={`trello_screen ${trello && trello.background.name}`}>
        <section className="trello_header">
          <div className="trello_setting">
            <div className="trello_title">{trello && trello.title}</div>
            <div className={`trello_favorite ${favorite}`} onClick={() => setFavorite(!favorite)}>
              {favorite ? <MdStar /> : <MdStarBorder />}
            </div>
            <div className="trello_trans_box">Invite</div>
          </div>
          <div className="trello_menu">
            <div className="trello_trans_box">Delete Board</div>
          </div>
        </section>

        <section className="trello_content">
          <div className="trello_items">
            <TrelloList />
            <CreateTrelloItem />
          </div>
        </section>
      </div>
    </GnbLayout>
  );
}

export default TrelloPage;
