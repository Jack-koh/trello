import * as type from 'store/types'
import { takeEvery } from 'redux-saga/effects'
import { login } from './auth'
import { getBoardList, createBoardItem } from './board'
import { getTrelloList, createTrelloItem, updateTrelloItem, deleteTrelloItem } from './trello'

import { createCard, getCardList } from './card'

export function* auth() {
  yield takeEvery(type.LOGIN_START, login)
}

export function* board() {
  yield takeEvery(type.GET_BOARD_LIST_START, getBoardList)
  yield takeEvery(type.CREATE_BOARD_ITEM_START, createBoardItem)
}

export function* trello() {
  yield takeEvery(type.GET_TRELLO_LIST_START, getTrelloList)
  yield takeEvery(type.CREATE_TRELLO_ITEM_START, createTrelloItem)
  yield takeEvery(type.UPDATE_TRELLO_ITEM_START, updateTrelloItem)
  yield takeEvery(type.DELETE_TRELLO_ITEM_START, deleteTrelloItem)
}

export function* card() {
  yield takeEvery(type.GET_CARD_LIST_START, getCardList)
  yield takeEvery(type.CREATE_CARD_START, createCard)
}
