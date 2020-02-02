import React from "react";

import classNames from "classnames/bind";
import style from "./template.module.scss";
import { connect } from "react-redux";
import * as actions from "store/actions";

const cx = classNames.bind(style);

function Template() {
  console.log("Template - check");
  return (
    <div className={cx("template-wrap")}>
      <div className={cx("template-inner-area")}>Template</div>
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Template);
