import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions";

function AuthCheck(props) {
  console.log("AuthCheck - check");
  useEffect(() => {
    props.autoAuthCheck();
    const token = localStorage.getItem("token");
    if (!token) props.history.push("/Login");
  }, [props]);
  return <React.Fragment>{props.children}</React.Fragment>;
}

const mapDispatchToProps = dispatch => {
  return {
    autoAuthCheck: () => dispatch(actions.authCheck())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(AuthCheck));
