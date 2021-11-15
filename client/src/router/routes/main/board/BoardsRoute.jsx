import React from 'react';
import { Switch, Route, Redirect, Router as BrowserRouter } from 'react-router-dom';
import history from 'shared/history';
import BoardsPage from 'pages/main/boads/BoardsPage';

function BoardsRoute() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route exact path="/main/board" component={BoardsPage} />
        <Redirect to="/main/board" />
      </Switch>
    </BrowserRouter>
  );
}

export default BoardsRoute;
