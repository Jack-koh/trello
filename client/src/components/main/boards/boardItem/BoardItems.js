import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "store/actions";
import "./BoardItems.scss";
import { MdStarBorder } from "react-icons/md";

const BoardItems = props => {
  console.log("BoardItems - check");

  useEffect(() => {
    props.onGetBoardItem();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onEnterTrelloHandler = item => {
    props.history.push(`/board/${item.title}`);
    localStorage.setItem("trello", JSON.stringify(item));
  };

  const onFavoriteHandler = (e, item) => {
    e.stopPropagation();
  };

  const itemEl =
    props.boardItems &&
    props.boardItems.map((item, i) => {
      return (
        <li
          key={i}
          className={`board_item ${item.background.name}`}
          onClick={() => onEnterTrelloHandler(item)}
        >
          <div className="board_item_inner">
            <span className="item_title">{item.title}</span>
          </div>
          <div className="board_hover_action">
            <MdStarBorder onClick={e => onFavoriteHandler(e, item)} />
          </div>
        </li>
      );
    });
  return (
    <React.Fragment>
      {props.boardItems && !!props.boardItems.length && itemEl}
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    boardItems: state.boards.list
  };
};

const mapDispatchToProp = dispatch => {
  return {
    onGetBoardItem: () => {
      dispatch(actions.getBoardsStart());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(withRouter(BoardItems));
