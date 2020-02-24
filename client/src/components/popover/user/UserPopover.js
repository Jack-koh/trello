import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import "./UserPopover.scss";
import { connect } from "react-redux";
import * as actions from "store/actions";
import { utilSetVisible } from "shared/utility";
export const setVisibility = utilSetVisible;

function UserPopover(props) {
  console.log("UserPopover - check");
  const wrapperRef = useRef(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // 클릭 아웃사이드 기능 생성 및 제거1
    const clickOutsideHandler = e => {
      if (wrapperRef.current.contains(e.target)) return;
      props.setVisibility(e);
    };

    document.addEventListener("click", clickOutsideHandler, true);
    const userData = JSON.parse(localStorage.getItem("user-data"));
    const { eamil, name } = userData;
    if (eamil && name) {
      setUserEmail(eamil.split("@")[0]);
      setUserName(name);
    }

    return () => {
      document.removeEventListener("click", clickOutsideHandler, true);
    };
  }, []);

  const logoutHandler = () => {
    props.onLogout();
    props.history.push("/Login");
  };

  return (
    <div ref={wrapperRef} className="user_dialog">
      <div className="user_dialog_content">
        <div className="user_dialog_inner">
          <div className="user_dialog_title">
            {`${userEmail} (${userName})`}
          </div>
          <nav>
            <ul>
              <li>
                <div>Profile and Visibility</div>
              </li>
              <li>
                <div>Activity</div>
              </li>
              <li>
                <div>Cards</div>
              </li>
              <li className="line_break">
                <div>Settings</div>
              </li>
              <li>
                <div>Help</div>
              </li>
              <li className="line_break">
                <div>Shortcuts</div>
              </li>
              <li onClick={logoutHandler}>
                <div>Log Out</div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(UserPopover));
