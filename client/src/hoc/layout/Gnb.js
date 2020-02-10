import React, { Fragment, useState } from "react";
import {
  MdHome,
  MdPoll,
  MdSearch,
  MdAdd,
  MdInfoOutline,
  MdAddAlert,
  MdAccountCircle
} from "react-icons/md";
import UserDialog from "components/popover/user/userPopup";
import "./Gnb.scss";

const Layout = props => {
  const [userDialog, setUserDialog] = useState(false);

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
      <div className="gnb_wrap">
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
      </div>
      {props.children}
    </Fragment>
  );
};

export default Layout;
