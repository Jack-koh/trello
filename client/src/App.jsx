import React from 'react';
import axios from 'axios';
import Router from 'router/Router';

axios.defaults.baseURL = '/api/';

const App = () => {
  return <Router />;
};

export default App;
