import React from "react";
import { MdPersonOutline } from "react-icons/md";
import "./Boards.scss";
import BoardItem from "./boardItem/BoardItem";

function Board() {
  console.log("Board - created");

  return (
    <section className="board_wrap">
      <div className="board_inner_area">
        <div className="board_section">
          <div className="board_title">
            <MdPersonOutline />
            <span>Personal Boards</span>
          </div>
          <BoardItem />
        </div>
      </div>
    </section>
  );
}

export default Board;
