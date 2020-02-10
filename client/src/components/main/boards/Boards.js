import React from "react";
import { MdPersonOutline } from "react-icons/md";
import "./Boards.scss";
import BoardItem from "./boardItem/BoardItem";

function Board() {
  console.log("Board - created");

  return (
    <div className="board-wrap">
      <div className="board-inner-area">
        <div className="board-section">
          <div className="board-title">
            <MdPersonOutline />
            <span>Personal Boards</span>
          </div>
          <BoardItem />
        </div>
      </div>
    </div>
  );
}

export default Board;
