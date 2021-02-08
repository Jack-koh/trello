import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authSlice, boardSlice, trelloSlice, cardSlice, loadingSlice } from 'store/reducers';

const reducer = combineReducers({
  loading: loadingSlice.reducer,
  auth: authSlice.reducer,
  board: boardSlice.reducer,
  trello: trelloSlice.reducer,
  card: cardSlice.reducer,
});

const middleware = [...getDefaultMiddleware()];
export default configureStore({ reducer, middleware });
