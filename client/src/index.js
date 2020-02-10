import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import authReducer from "store/reducers/auth";
import boardsReducer from "store/reducers/boards";
import trelloReducer from "store/reducers/trello";

import { auth, boards } from "store/sagas/index";

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const reducer = combineReducers({
  auth: authReducer,
  boards: boardsReducer,
  trello: trelloReducer
});
const sagaMiddleware = createSagaMiddleware();
const enhencer = composeEnhancers(applyMiddleware(thunk, sagaMiddleware));
const store = createStore(reducer, enhencer);

sagaMiddleware.run(auth);
sagaMiddleware.run(boards);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
