import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import BoardsPage from 'pages/main/boads/BoardsPage';

function BoardsRoute() {
  return (
    <Switch>
      <Route exact path="/main/board" component={BoardsPage} />
      <Redirect to="/main/board" />
    </Switch>
  );
}

export default BoardsRoute;
