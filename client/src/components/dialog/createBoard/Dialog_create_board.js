import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import { MdClose } from "react-icons/md";
import axios from "axios";
import "./Dialog_create_board.scss";

import Spinner from "shared/spinner/Spinner";

import Backdrop from "components/dialog/Backdrop";

function DialogCreateBoard(props) {
  const [boardTitle, setBoardTitle] = useState("");
  const [bgName, setBgName] = useState("bg-forest");
  const [loading, setLoading] = useState(false);

  const createBoardHandler = async e => {
    e.preventDefault();
    const background = backgroundList.find(el => el.name === bgName);
    const userData = JSON.parse(localStorage.getItem("user-data"));
    const param = {
      title: boardTitle,
      background: background,
      userNo: userData.userNo
    };
    try {
      setLoading(true);
      const respData = await axios.post("boards/create", param);
      setLoading(false);
      props.closeDialog();
      await localStorage.setItem("trello", JSON.stringify(respData.data.list));
      props.history.push(`/board/${respData.data.list.title}`);
    } catch (err) {
      console.log("create-board-errer");
      setLoading(false);
    }
  };

  const backgroundList = [
    { type: "image", name: "bg-forest" },
    { type: "image", name: "bg-sandcave" },
    { type: "image", name: "bg-bird" },
    { type: "image", name: "bg-mountain" },
    { type: "color", name: "bg-blue" },
    { type: "color", name: "bg-yellow" },
    { type: "color", name: "bg-green" },
    { type: "color", name: "bg-brown" },
    { type: "color", name: "bg-brown" }
  ];

  const backgroundEl = backgroundList.map((item, i) => {
    return (
      <li
        key={i}
        className={`choice_card ${item.name}`}
        onClick={() => setBgName(item.name)}
      />
    );
  });

  return (
    <Fragment>
      <div className="create_board_dialog">
        <form onSubmit={createBoardHandler}>
          <div className="set_board">
            <div className={`board_card ${bgName}`}>
              <MdClose onClick={props.closeDialog} />
              <input
                type="text"
                placeholder="Add board title"
                value={boardTitle}
                onChange={e => setBoardTitle(e.target.value)}
              />
            </div>
            <ul className="card_background">{backgroundEl}</ul>
          </div>

          <div className="bottom_utils">
            <button disabled={boardTitle.length === 0}>
              {loading ? <Spinner /> : "Create Board"}
            </button>
          </div>
        </form>
      </div>
      <Backdrop />
    </Fragment>
  );
}

export default withRouter(DialogCreateBoard);
