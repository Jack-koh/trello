import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions";
import { MdClose } from "react-icons/md";
import axios from "axios";
import "./Dialog_create_board.scss";

import Spinner from "shared/spinner/Spinner";

import Backdrop from "components/dialog/Backdrop";

function DialogCreateBoard(props) {
  const [boardTitle, setBoardTitle] = useState("");
  const [bgName, setBgName] = useState("bg-forest");
  const [teams, setTeams] = useState(false);
  const [loading, setLoading] = useState(false);

  const createBoardHandler = async e => {
    e.preventDefault();
    const background = backgroundList.find(el => el.name === bgName);
    const userData = JSON.parse(localStorage.getItem("user-data"));
    const param = {
      title: boardTitle,
      background: background,
      teams: teams,
      userNo: userData.userNo
    };
    try {
      setLoading(true);
      await axios.post("boards/create", param);
      await axios.get("boards/get", { userNo: param.userNo });
      setLoading(false);
      props.closeDialog();
    } catch (err) {
      console.log("create-board-errer");
      setLoading(false);
    }
  };

  const baseUrl = "https://images.unsplash.com/photo-";
  const lastUrl = "&auto=format&fit=crop&w=1350&q=80";
  const backgroundList = [
    {
      type: "image",
      name: "bg-forest",
      url: `${baseUrl}1500762728065-466b7a170c96?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9${lastUrl}`
    },
    {
      type: "image",
      name: "bg-sandcave",
      url: `${baseUrl}1444076784383-69ff7bae1b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9${lastUrl}`
    },
    {
      type: "image",
      name: "bg-bird",
      url: `${baseUrl}1578279043004-e218349bfdfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9${lastUrl}`
    },
    {
      type: "image",
      name: "bg-mountain",
      url: `${baseUrl}1493246507139-91e8fad9978e?ixlib=rb-1.2.1${lastUrl}`
    },
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
        className={`choice-card ${item.name}`}
        onClick={() => setBgName(item.name)}
      />
    );
  });

  return (
    <Fragment>
      <div className="create-board-dialog">
        <form onSubmit={createBoardHandler}>
          <div className="set-board">
            <div className={`board-card ${bgName}`}>
              <MdClose onClick={props.closeDialog} />
              <input
                type="text"
                placeholder="Add board title"
                value={boardTitle}
                onChange={e => setBoardTitle(e.target.value)}
              />
            </div>
            <ul className="card-background">{backgroundEl}</ul>
          </div>

          <div className="bottom-utils">
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

const mapDispatchToProps = dispatch => {
  return {
    onGetBoardItem: userNo => {
      dispatch(actions.getBoardItemStart(userNo));
    }
  };
};

export default connect(null, mapDispatchToProps)(DialogCreateBoard);
