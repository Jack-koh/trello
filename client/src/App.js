import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Login from 'pages/Login/Login'
import Main from 'pages/Main/Main'

let loginPage = null;
const App = (props) => {

  if (props.location.pathname === '/') {
    loginPage = <Redirect to="/Login" />
  }

  const routes = (
    <Switch>
      <Route path="/Login" component={Login}></Route>
      <Route path="/Signup" component={Login}></Route>
      <Route path="/userName/boards" exact component={Main}></Route>
    </Switch>
  )

  return (
    <div>
      {loginPage}
      {routes}
    </div>
  );
}

export default withRouter(App);
