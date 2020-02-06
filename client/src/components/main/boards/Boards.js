import React, { useEffect, useCallback } from "react";
import { MdPersonOutline } from "react-icons/md";
import classNames from "classnames/bind";
import style from "./Boards.module.scss";
import BoardItem from "./boardItem/BoardItem";
import * as actions from "store/actions";

const cx = classNames.bind(style);

const Board = props => {
  console.log("Board - created");

  return (
    <div className={cx("board-wrap")}>
      <div className={cx("board-inner-area")}>
        <div className={cx("board-section")}>
          <div className={cx("board-title")}>
            <MdPersonOutline />
            <span>Personal Boards</span>
          </div>
          <BoardItem />
        </div>
      </div>
    </div>
  );
};

export default Board;
