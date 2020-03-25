import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { authReducer, boardReducer, trelloReducer, loadingReducer, cardReducer } from 'store/reducers';

import { auth, board, trello, card } from 'store/sagas';

function configureStore() {
  const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devtools && process.env.NODE_ENV === 'development' ? devtools : null || compose;

  const reducer = combineReducers({
    loading: loadingReducer,
    auth: authReducer,
    board: boardReducer,
    trello: trelloReducer,
    card: cardReducer,
  });
  const sagaMiddleware = createSagaMiddleware();
  const enhencer = composeEnhancers(applyMiddleware(thunk, sagaMiddleware));
  const store = createStore(reducer, enhencer);

  sagaMiddleware.run(auth);
  sagaMiddleware.run(board);
  sagaMiddleware.run(trello);
  sagaMiddleware.run(card);

  return store;
}

export default configureStore;
