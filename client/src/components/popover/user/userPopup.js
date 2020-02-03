import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames/bind";
import style from "./userPopup.module.scss";
import { connect } from "react-redux";
import * as actions from "store/actions";

const cx = classNames.bind(style);

function Dialog(props) {
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    // 클릭 아웃사이드 기능 생성 및 제거1
    const outsideClickHandler = e => {
      if (wrapperRef.current.contains(e.target)) return;
      props.clickOutsideHandler(e);
    };

    document.addEventListener("click", outsideClickHandler, true);
    const userData = JSON.parse(localStorage.getItem("user-data"));
    const eamil = userData.email;
    const name = userData.name;
    if (eamil && name) {
      setUserEmail(eamil.split("@")[0]);
      setUserName(name);
    }

    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
    };
  }, [props]);

  const logoutHandler = () => {
    props.onLogout();
    props.history.push("/Login");
  };

  return (
    <div ref={wrapperRef} className={cx("user-dialog")}>
      <div className={cx("user-dialog-content")}>
        <div className={cx("user-dialog-inner")}>
          <div className={cx("user-dialog-title")}>
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
              <li className={cx("line-break")}>
                <div>Settings</div>
              </li>
              <li>
                <div>Help</div>
              </li>
              <li className={cx("line-break")}>
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

export default connect(null, mapDispatchToProps)(withRouter(Dialog));
