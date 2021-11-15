import React from 'react';
import axios from 'axios';
import Router from 'router/Router';
import history from 'shared/history';
import { Router as BrowserRouter } from 'react-router-dom';

axios.defaults.baseURL = '/api/';

const App = () => {
  return (
    <BrowserRouter history={history}>
      <Router />
    </BrowserRouter>
  );
};

export default App;
