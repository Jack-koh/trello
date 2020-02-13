import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "store/actions";
import propTypes from "prop-types";
import "./BoardItem.scss";
import { MdStarBorder } from "react-icons/md";

import DialogCreateBoard from "components/dialog/createBoard/Dialog_create_board";

const BoardItem = props => {
  console.log("BoardItem - check");
  const [dialog, setDialog] = useState(false);

  useEffect(() => {
    console.log("Board - mounted");
    props.onGetBoardItem();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCreateDialogHandler = () => {
    setDialog(!dialog);
  };

  const onEnterTrelloHandler = item => {
    props.history.push(`/board/${item.title}`);
    localStorage.setItem("trello", JSON.stringify(item));
  };

  const onFavoriteHandler = (e, item) => {
    e.stopPropagation();
    console.log(item);
  };

  const itemEl = props.boardItems.map((item, i) => {
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

  const createEl = (
    <li className="board_item bg_gray" onClick={onCreateDialogHandler}>
      <div className="board_item_inner create">
        <span className="create_item_title">Create new board</span>
      </div>
      <div className="create_hover_action"></div>
    </li>
  );

  return (
    <Fragment>
      <ul className="board_item_section">
        {!!props.boardItems.length && itemEl}
        {createEl}
      </ul>
      {dialog && <DialogCreateBoard closeDialog={() => setDialog(false)} />}
    </Fragment>
  );
};

BoardItem.propTypes = {
  boardItems: propTypes.array
};

const mapStateToProps = state => {
  return {
    boardItems: state.boards.list
  };
};

const mapDispatchToProp = dispatch => {
  return {
    onGetBoardItem: userNo => {
      dispatch(actions.getBoardItemStart(userNo));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(withRouter(BoardItem));
