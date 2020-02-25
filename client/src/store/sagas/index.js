import * as type from 'store/actions/types';
import { takeEvery } from 'redux-saga/effects';
import { login } from './auth';
import { getBoardItems, createBoardItem } from './boards';
import { getTrelloLists, createTrelloList } from './trello';

export function* auth() {
  yield takeEvery(type.LOGIN_START, login);
}

export function* boards() {
  yield takeEvery(type.GET_BOARDS_START, getBoardItems);
  yield takeEvery(type.CREATE_BOARD_START, createBoardItem);
}

export function* trello() {
  yield takeEvery(type.GET_TRELLO_LIST_START, getTrelloLists);
  yield takeEvery(type.CREATE_TRELLO_LIST_START, createTrelloList);
}
