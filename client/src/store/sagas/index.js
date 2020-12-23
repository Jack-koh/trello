import * as type from 'store/actions/types';
import { takeEvery } from 'redux-saga/effects';
import { login } from './auth';
import { getBoardList, createBoardItem, updateBoarItem, deleteBoardItem } from './board';
import { getTrelloList, createTrello, updateTrello, deleteTrello, dragTrello } from './trello';

import { createCard, dragCardEnd, updateCard, deleteCard } from './card';

export function* auth() {
  yield takeEvery(type.LOGIN_START, login);
}

export function* board() {
  yield takeEvery(type.GET_BOARD_LIST_START, getBoardList);
  yield takeEvery(type.CREATE_BOARD_ITEM_START, createBoardItem);
  yield takeEvery(type.UPDATE_BOARD_ITEM_START, updateBoarItem);
  yield takeEvery(type.DELETE_BOARD_ITEM_START, deleteBoardItem);
}

export function* trello() {
  yield takeEvery(type.GET_TRELLO_LIST_START, getTrelloList);
  yield takeEvery(type.CREATE_TRELLO_ITEM_START, createTrello);
  yield takeEvery(type.UPDATE_TRELLO_ITEM_START, updateTrello);
  yield takeEvery(type.DELETE_TRELLO_ITEM_START, deleteTrello);
  yield takeEvery(type.DRAG_TRELLO_ITEM_END, dragTrello);
}

export function* card() {
  yield takeEvery(type.CREATE_CARD_START, createCard);
  yield takeEvery(type.DELETE_CARD_ITEM_START, deleteCard);
  yield takeEvery(type.DRAG_CARD_END, dragCardEnd);
  yield takeEvery(type.UPDATE_CARD_START, updateCard);
}
