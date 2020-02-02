import React, { useEffect } from "react";
import { MdPersonOutline } from "react-icons/md";
import classNames from "classnames/bind";
import style from "./Boards.module.scss";
import BoardItem from "./boardItem/BoardItem";
import { connect } from "react-redux";
import * as actions from "store/actions";

const cx = classNames.bind(style);

const Board = props => {
  console.log("Board - created");

  // useEffect(() => {
  //   console.log("Board - mounted");
  //   props.onGetBoardItem(props.auth.userNo);
  // });

  const boardList = [];

  return (
    <div className={cx("board-wrap")}>
      <div className={cx("board-inner-area")}>
        <div className={cx("board-section")}>
          <div className={cx("board-title")}>
            <MdPersonOutline />
            <span>Personal Boards</span>
          </div>
          <BoardItem list={boardList} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetBoardItem: userNo => {
      dispatch(actions.getBoardItemStart(userNo));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
