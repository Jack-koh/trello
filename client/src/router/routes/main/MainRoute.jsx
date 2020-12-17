import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BoardsRoute from 'router/routes/main/board/BoardsRoute';
import TamplatePage from 'pages/main/template/TamplatePage';
import HomePage from 'pages/main/home/HomePage';
import TrelloPage from 'pages/trello/TrelloPage';

function Main() {
  return (
    <Switch>
      <Route path="/main/board" component={BoardsRoute} />
      <Route path="/main/template" component={TamplatePage} />
      <Route path="/main/home" component={HomePage} />
      <Route path="/main/trello" component={TrelloPage} />
      <Redirect to="/main/board" />
    </Switch>
  );
}

export default Main;
