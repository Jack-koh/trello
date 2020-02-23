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
import UserPopover, {
  setVisibility
} from "components/popover/user/UserPopover";
import "./Gnb.scss";

const Gnb = props => {
  console.log("Gnb - check");
  const [userPopover, setUserPopover] = useState(false);
  const [background, setBackground] = useState({ background: "#026aa7" });

  useEffect(() => {
    if (props.location.pathname.substring(1).split("/")[0] !== "main") {
      setBackground({ background: "rgba(0,0,0,.15)" });
    }
  }, [props.location.pathname]);

  const onDialogHandler = e => {
    e.preventDefault();
    setUserPopover(!userPopover);
  };

  const toHomeHandler = () => {
    if (props.location.pathname === "/main/boards") return;
    props.history.push("/main/boards");
  };

  return (
    <Fragment>
      <header className="gnb_wrap" style={background}>
        <div className="gnb_left">
          <div className="rectangle_btn" onClick={toHomeHandler}>
            <MdHome />
          </div>
          <div className="board_btn">
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
          <div className="rectangle_btn">
            <MdAdd />
          </div>
          <div className="rectangle_btn">
            <MdInfoOutline />
          </div>
          <div className="rectangle_btn">
            <MdAddAlert />
          </div>
          <div className="circle_btn">
            <MdAccountCircle onClick={onDialogHandler} />
            {userPopover && (
              <UserPopover
                setVisibility={e =>
                  setVisibility(e, userPopover, setUserPopover)
                }
              />
            )}
          </div>
        </div>
      </header>
      {props.children}
    </Fragment>
  );
};

export default withRouter(Gnb);
