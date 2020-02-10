import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions";

import SideBar from "hoc/layout/SideBar";
import Board from "components/main/boards/Boards";
import Tamplate from "components/main/template/Tamplate";
import Home from "components/main/home/Home";
import Gnb from "hoc/layout/Gnb";

function Main(props) {
  console.log("Main - created");
  useEffect(() => {
    props.autoAuthCheck();
    const token = localStorage.getItem("token");
    if (!token) {
      props.history.push("/Login");
    }
  }, [props]);

  return (
    <SideBar>
      <Route path="/main/boards" component={Board}></Route>
      <Route path="/main/template" component={Tamplate}></Route>
      <Route path="/main/home" component={Home}></Route>
    </SideBar>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    autoAuthCheck: () => dispatch(actions.authCheck())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Main));
