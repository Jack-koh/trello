import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import SideBar from 'containers/SideBar/SideBar'

import Login from 'containers/Login/Login'
import Layout from 'hoc/Layout/Layout'
import Board from 'containers/Board/Board'

let loginPage = null;
const App = (props) => {

  if (props.location.pathname === '/') {
    loginPage = <Redirect to="/Login" />
  }

  const routes = (
    <Switch>
      <Route path="/Login" component={Login}></Route>
      <Layout>
        <SideBar>
          <Route path="/userName/boards" exact component={Board}></Route>
          <Route path="/template" exact component={Board}></Route>
        </SideBar>
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
