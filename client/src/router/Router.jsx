import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import AuthCheck from 'hoc/authCheck';

import Login from 'pages/login/Login';
import Signup from 'pages/signup/Signup';
import Main from 'pages/main/Main';
import Gnb from 'hoc/layout/Gnb';
import Trello from 'pages/trello/Trello';

function Router(props) {
  const { location, history } = props;
  if (location.pathname === '/') {
    history.push('/Login');
  }

  const GnbRoute = ({ ...rest }) => {
    return (
      <Gnb>
        <Route path={rest.path} component={rest.component} />
      </Gnb>
    );
  };

  return (
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/Signup" component={Signup} />
      <AuthCheck>
        <GnbRoute path="/main" component={Main} />
        <GnbRoute path="/board" component={Trello} />
      </AuthCheck>
      <Redirect to="/Login" />
    </Switch>
  );
}

export default withRouter(Router);
