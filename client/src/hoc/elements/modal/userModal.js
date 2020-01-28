import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "./modal.module.scss";
import { connect } from "react-redux";

const cx = classNames.bind(style);

function Modal(props) {
  console.log("Modal - check");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const wrapperRef = useRef(null);

  useEffect(() => {
    const eamil = props.userData.email;
    const name = props.userData.name;
    if (eamil && name) {
      setUserEmail(eamil.split("@")[0]);
      setUserName(name);
    }
  }, [props.userData]);

  const handleOutsideClick = e => {
    if (wrapperRef.current.contains(e.target)) {
      return;
    }
  };

  if (props.userModal) {
    // document.addEventListener('click', handleOutsideClick, true)
  } else {
    // document.removeEventListener('click', handleOutsideClick, true)
  }

  return (
    <div ref={wrapperRef} className={cx("custom-gnb-modal")}>
      {props.children}
      {props.userModal && (
        <div className={cx("gnb-modal-content")}>
          <div className={cx("gnb-modal-inner")}>
            <div className={cx("gnb-modal-title")}>
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
                <li>
                  <div>Shortcuts</div>
                </li>
                <li className={cx("line-break")}>
                  <div>Change Language...</div>
                </li>
                <li>
                  <div>Log Out</div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.auth
  };
};

export default connect(mapStateToProps)(Modal);
