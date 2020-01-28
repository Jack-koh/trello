import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Login from "pages/login/Login";
import Signup from "pages/signup/Signup";
import Main from "pages/main/Main";

const App = props => {
  if (props.location.pathname === "/") {
    props.history.push("/Login");
  }

  return (
    <div>
      <Switch>
        <Route path="/Login" component={Login}></Route>
        <Route path="/Signup" component={Signup}></Route>
        <Route path="/main" component={Main}></Route>
        <Redirect to="/Login" />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userName: state.auth.name
  };
};

export default connect(mapStateToProps)(withRouter(App));
