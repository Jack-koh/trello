import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions";
import propTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./BoardItem.module.scss";
import { MdStarBorder } from "react-icons/md";

import DialogCreateBoard from "components/dialog/createBoard/Dialog_create_board";

const cx = classNames.bind(styles);

const BoardItem = props => {
  console.log("BoardItem - check");

  useEffect(() => {
    console.log("Board - mounted");
    props.onGetBoardItem();
  }, []);

  const onCreateDialogHandler = () => {
    props.onSetDialog("dialog-create-board");
  };

  const itemEl = props.boardItems.map((item, i) => {
    return (
      <li key={i} className={cx("board-item", item.background.name)}>
        <div className={cx("board-item-inner")}>
          <span className={cx("item-title")}>{item.title}</span>
        </div>
        <div className={cx("board-hover-action")}>
          <MdStarBorder />
        </div>
      </li>
    );
  });

  const createEl = (
    <li className={cx("board-item", "bg-gray")} onClick={onCreateDialogHandler}>
      <div className={cx("board-item-inner", "create")}>
        <span className={cx("create-item-title")}>Create new board</span>
      </div>
      <div className={cx("create-hover-action")}></div>
    </li>
  );

  return (
    <Fragment>
      <ul className={cx("board-item-section")}>
        {itemEl}
        {createEl}
      </ul>
      {props.dialogName === "dialog-create-board" && <DialogCreateBoard />}
    </Fragment>
  );
};

BoardItem.propTypes = {
  boardItems: propTypes.array
};

const mapStateToProps = state => {
  return {
    dialogName: state.dialog.name,
    boardItems: state.boards.list
  };
};

const mapDispatchToProp = dispatch => {
  return {
    onSetDialog: name => dispatch(actions.setDialog(name)),
    onGetBoardItem: userNo => {
      dispatch(actions.getBoardItemStart(userNo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(BoardItem);
