import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  MdHome,
  MdPoll,
  MdSearch,
  MdAdd,
  MdInfoOutline,
  MdAddAlert,
  MdAccountCircle
} from "react-icons/md";
import UserDialog from "components/popover/user/UserDialog";
import "./Gnb.scss";

const Gnb = props => {
  const [userDialog, setUserDialog] = useState(false);
  const [background, setBackground] = useState({ background: "#026aa7" });

  useEffect(() => {
    if (props.location.pathname.substring(1).split("/")[0] !== "main") {
      setBackground({ background: "rgba(0,0,0,.15)" });
    }
  }, []);

  const onDialogHandler = e => {
    e.preventDefault();
    setUserDialog(!userDialog);
  };

  const clickOutsideHandler = e => {
    e.stopPropagation();
    if (userDialog) {
      setUserDialog(!userDialog);
    }
  };

  return (
    <Fragment>
      <header className="gnb_wrap" style={background}>
        <div className="gnb_left">
          <div className="rectangle_btn common_btn">
            <MdHome />
          </div>
          <div className="board_btn common_btn">
            <MdPoll />
            Boards
          </div>
          <div className="search_input_wrap">
            <input className="search_input" />
            <MdSearch />
          </div>
        </div>
        <div className="logo"></div>
        <div className="gnb_right">
          <div className="rectangle_btn common_btn">
            <MdAdd />
          </div>
          <div className="rectangle_btn common_btn">
            <MdInfoOutline />
          </div>
          <div className="rectangle_btn common_btn">
            <MdAddAlert />
          </div>
          <div className="circle_btn">
            <MdAccountCircle onClick={onDialogHandler} />
            {userDialog && (
              <UserDialog clickOutsideHandler={clickOutsideHandler} />
            )}
          </div>
        </div>
      </header>
      {props.children}
    </Fragment>
  );
};

export default withRouter(Gnb);
