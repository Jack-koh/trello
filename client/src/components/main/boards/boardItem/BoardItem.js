import React, { Fragment } from "react";
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

  const onCreateDialogHandler = () => {
    props.onSetDialog("dialog-create-board");
  };

  const itemEl = props.list.map((item, i) => {
    return (
      <li key={i} className={cx("board-item", item.background)}>
        <div className={cx("board-item-inner")}>
          <span className={cx("item-title")}>{item.name}</span>
        </div>
        <div className={cx("board-hover-action")}>
          <div className="back-drop"></div>
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
      <div className={cx("create-hover-action")}>
        <div className="back-drop"></div>
      </div>
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
  list: propTypes.array
};

const mapStateToProps = state => {
  return {
    dialogName: state.dialog.name
  };
};

const mapDispatchToProp = dispatch => {
  return {
    onSetDialog: name => dispatch(actions.setDialog(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProp)(BoardItem);
