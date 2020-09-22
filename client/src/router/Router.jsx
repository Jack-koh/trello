import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import * as action from 'store/actions';

import LoginPage from 'pages/login/LoginPage';
import SignupPage from 'pages/signup/SignupPage';
import MainPage from 'pages/main/MainPage';
import TrelloPage from 'pages/trello/TrelloPage';

function Router(props) {
  return (
    <Switch>
      <Route exact path="/Login" component={LoginPage} />
      <Route path="/Signup" component={SignupPage} />
      <AuthRouter path="/main" component={MainPage} />
      <AuthRouter path="/board" component={TrelloPage} />
      <Redirect to="/Login" />
    </Switch>
  );
}

export default Router;

const AuthRouter = ({ exact, path, component: Component }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const autoAuthCheck = useCallback(() => dispatch(action.authCheck()), [dispatch]);

  useEffect(() => {
    autoAuthCheck();
    const token = localStorage.getItem('token');
    if (!token) history.push('/Login');
  }, [autoAuthCheck]);
  return (
    <Route exact={exact} path={path}>
      <Component />
    </Route>
  );
};
