import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import BoardsRoute from 'router/routes/main/board/BoardsRoute';
import FavoritePage from 'pages/main/favorite/FavoritePage';
import TrelloPage from 'pages/trello/TrelloPage';

function Main() {
  return (
    <Switch>
      <Route path="/main/board" component={BoardsRoute} />
      <Route path="/main/trello" component={TrelloPage} />
      <Route path="/main/favorite" component={FavoritePage} />
      <Redirect to="/main/board" />
    </Switch>
  );
}

export default Main;
