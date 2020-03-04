import * as type from 'store/types'
import { takeEvery } from 'redux-saga/effects'
import { login } from './auth'
import { getBoardList, createBoardItem } from './boards'
import { getTrelloList, createTrelloItem, updateTrelloItem } from './trello'

export function* auth() {
  yield takeEvery(type.LOGIN_START, login)
}

export function* boards() {
  yield takeEvery(type.GET_BOARDS_START, getBoardList)
  yield takeEvery(type.CREATE_BOARD_START, createBoardItem)
}

export function* trello() {
  yield takeEvery(type.GET_TRELLO_LIST_START, getTrelloList)
  yield takeEvery(type.CREATE_TRELLO_ITEM_START, createTrelloItem)
  yield takeEvery(type.UPDATE_TRELLO_ITEM_START, updateTrelloItem)
}
