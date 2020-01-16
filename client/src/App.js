import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Login from 'containers/Login/Login'
import Home from 'containers/Home/Home'
import Layout from 'hoc/Layout/Layout'

let loginPage = null;
const App = (props) => {

  // if (props.location.pathname === '/') {
  //   loginPage = <Redirect to="/Login" />
  // }

  const routes = (
    <Switch>
      <Route path="/Login" component={Login}></Route>
      <Layout>
        <Route path="/userName/boards" component={Home}></Route>
      </Layout>
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
