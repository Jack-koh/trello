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

  const onCloseDialogHandler = () => {
    setDialog(false);
    props.onGetBoardItem();
  };

  const onEnterTrelloHandler = item => {
    props.onSetTrello(item);
    props.history.push(`/board/${item.title}`);
  };

  const onFavoriteHandler = (e, item) => {
    e.stopPropagation();
    console.log(item);
  };

  const itemEl = props.boardItems.map((item, i) => {
    return (
      <li
        key={i}
        className={`board-item ${item.background.name}`}
        onClick={() => onEnterTrelloHandler(item)}
      >
        <div className="board-item-inner">
          <span className="item-title">{item.title}</span>
        </div>
        <div className="board-hover-action">
          <MdStarBorder onClick={e => onFavoriteHandler(e, item)} />
        </div>
      </li>
    );
  });

  const createEl = (
    <li className="board-item bg-gray" onClick={onCreateDialogHandler}>
      <div className="board-item-inner create">
        <span className="create-item-title">Create new board</span>
      </div>
      <div className="create-hover-action"></div>
    </li>
  );

  return (
    <Fragment>
      <ul className="board-item-section">
        {!!props.boardItems.length && itemEl}
        {createEl}
      </ul>
      {dialog && <DialogCreateBoard closeDialog={onCloseDialogHandler} />}
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
    },
    onSetTrello: item => {
      dispatch(actions.setTrelloItem(item));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProp
)(withRouter(BoardItem));
