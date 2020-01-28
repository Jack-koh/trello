import React, { useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "store/actions";

import SideBar from "hoc/Layout/SideBar";
import Board from "components/main/boards/Boards";
import Tamplate from "components/main/template/Tamplate";
import Home from "components/main/home/Home";
import MainGnb from "hoc/Layout/MainGnb";

function Main(props) {
  console.log("Main - check");
  useEffect(() => {
    props.autoAuthCheck();
    const token = localStorage.getItem("token");
    if (!token) {
      props.history.push("/Login");
    }
  }, []);

  return (
    <MainGnb>
      <SideBar>
        <Route path="/main/boards" component={Board}></Route>
        <Route path="/main/template" component={Tamplate}></Route>
        <Route path="/main/home" component={Home}></Route>
      </SideBar>
    </MainGnb>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    autoAuthCheck: () => dispatch(actions.authCheck())
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Main));
