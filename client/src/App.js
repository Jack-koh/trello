import React from "react";
import Router from "router/Router";

// base url설정
import axios from "axios";
axios.defaults.baseURL = "/api/";

const App = props => {
  return <Router />;
};

export default App;
