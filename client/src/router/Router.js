import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AuthCheck from "hoc/authCheck";

import Login from "pages/login/Login";
import Signup from "pages/signup/Signup";
import Main from "pages/main/Main";
import Gnb from "hoc/layout/Gnb";
import Trello from "pages/trello/Trello";

function Router(props) {
  if (props.location.pathname === "/") {
    props.history.push("/Login");
  }

  const GnbRoute = ({ ...rest }) => {
    return (
      <Gnb>
        <Route {...rest} />
      </Gnb>
    );
  };

  return (
    <Switch>
      <Route path="/Login" component={Login}></Route>
      <Route path="/Signup" component={Signup}></Route>
      <AuthCheck>
        <GnbRoute path="/main" component={Main}></GnbRoute>
        <GnbRoute path="/board" component={Trello}></GnbRoute>
      </AuthCheck>
      <Redirect to="/Login" />
    </Switch>
  );
}

export default withRouter(Router);
