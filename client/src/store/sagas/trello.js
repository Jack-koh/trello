import axios from 'axios'
import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* createTrelloItem(action) {
  const { boardNo, userNo, userEmail, userName, title } = action.payload
  try {
    const respData = yield axios.post('trello/create', {
      boardNo,
      userNo,
      userEmail,
      userName,
      title
    })
    yield put(actions.createTrelloItemSuccess(respData.data.item))
  } catch (err) {
    console.log('createTrelloItem err ----')
  }
}

export function* getTrelloList(action) {
  yield put(actions.loadingStart())
  try {
    const respData = yield axios.get('trello/get', { params: { boardNo: action.boardNo } })
    yield put(actions.getTrelloListSuccess(respData.data.list))
    yield put(actions.loadingFinished())
  } catch (err) {
    console.log('getTrelloList err ----')
    yield put(actions.loadingFinished())
  }
}

export function* updateTrelloItem(action) {
  const { _id, title } = action.payload
  yield put(actions.loadingStart())
  try {
    const respData = yield axios.put('trello/update', { _id, title })
    yield put(actions.updateTrelloItemSuccess(respData.data.list))
    yield put(actions.loadingFinished())
  } catch (err) {
    console.log('updateTrelloItem err ----')
    yield put(actions.loadingFinished())
  }
}

export function* deleteTrelloItem(action) {
  try {
    const respData = yield axios.put('trello/delete', { _id: action.listId })
    yield put(actions.deleteTrelloItemSuccess(respData.data._id))
  } catch (err) {
    console.log('updateTrelloItem err ----')
  }
}
