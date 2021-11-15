import React from 'react';
import { Switch, Route, Redirect, Router as BrowserRouter } from 'react-router-dom';
import history from 'shared/history';
import BoardsRoute from 'router/routes/main/board/BoardsRoute';
import FavoritePage from 'pages/main/favorite/FavoritePage';
import TrelloPage from 'pages/trello/TrelloPage';

function Main() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/main/board" component={BoardsRoute} />
        <Route path="/main/trello" component={TrelloPage} />
        <Route path="/main/favorite" component={FavoritePage} />
        <Redirect to="/main/board" />
      </Switch>
    </BrowserRouter>
  );
}

export default Main;
