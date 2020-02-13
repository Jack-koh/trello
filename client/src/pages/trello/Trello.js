import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MdStarBorder, MdStar } from "react-icons/md";
import * as actions from "store/actions";
import "./Trello.scss";

import AddList from "./AddList/AddList";

function Board(props) {
  // userNo: 2
  // boardNo: 17
  // title: "test"
  // background: {type: "image", name: "bg-forest"}
  // createdAt: "2020-02-13T13:13:00.595Z"
  // updatedAt: "2020-02-13T13:13:00.595Z"

  const [trello, setTrello] = useState(
    JSON.parse(localStorage.getItem("trello"))
  );

  useEffect(() => {
    console.log(trello);
  }, [props, trello]);

  const funchand = () => {
    setTrello({ ...trello, title: "nothing" });
  };

  return (
    <main className={`trello_screen ${trello.background.name}`}>
      <section className="trello_header">
        <div className="trello_setting">
          <div className="trello_title">{trello.title}</div>
          <div className="trello_favorite">
            <MdStarBorder />
          </div>
          <div className="trello_trans_box">Invite</div>
        </div>
        <div className="trello_menu">
          <div className="trello_trans_box">Show Menu</div>
        </div>
      </section>
      <section className="trello_content">
        <AddList />
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
  return {
    onInitTrelloItem: () => dispatch(actions.initTrelloItem())
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(Board);
