import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import { auth, board, trello, card } from 'store/sagas'
import { authReducer, boardReducer, trelloReducer, loadingReducer } from 'store/reducers'

import App from './App'
import * as serviceWorker from './serviceWorker'

const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers =
  devtools && process.env.NODE_ENV === 'development' ? devtools : null || compose

const reducer = combineReducers({
  loading: loadingReducer,
  auth: authReducer,
  board: boardReducer,
  trello: trelloReducer
})
const sagaMiddleware = createSagaMiddleware()
const enhencer = composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
const store = createStore(reducer, enhencer)

sagaMiddleware.run(auth)
sagaMiddleware.run(board)
sagaMiddleware.run(trello)
sagaMiddleware.run(card)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
