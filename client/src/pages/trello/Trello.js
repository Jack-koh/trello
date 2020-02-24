import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { MdStarBorder, MdStar } from "react-icons/md";
import * as actions from "store/actions";
import "./Trello.scss";

import CreateList from "components/trello/CreateList";

function Board(props) {
  console.log("Board - check");
  const [favorite, setFavorite] = useState(false);
  const [trello] = useState(JSON.parse(localStorage.getItem("trello")));

  useEffect(() => {
    const getTrello = async () => {
      const respData = await axios.get("trello/get", {
        params: { boardNo: trello.boardNo }
      });
    };
    getTrello();
  }, []);

  const setFavoriteHandler = () => {
    setFavorite(!favorite);
  };

  return (
    <main className={`trello_screen ${trello && trello.background.name}`}>
      <section className="trello_header">
        <div className="trello_setting">
          <div className="trello_title">{trello && trello.title}</div>
          <div
            className={`trello_favorite ${favorite}`}
            onClick={setFavoriteHandler}
          >
            {favorite ? <MdStar /> : <MdStarBorder />}
          </div>
          <div className="trello_trans_box">Invite</div>
        </div>
        <div className="trello_menu">
          <div className="trello_trans_box">Show Menu</div>
        </div>
      </section>
      <section className="trello_content">
        <CreateList />
      </section>
    </main>
  );
}

const mapStateToProps = state => {
  return {
    getTrello: state.trello
  };
};

const mapDispatchToProp = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProp)(Board);
