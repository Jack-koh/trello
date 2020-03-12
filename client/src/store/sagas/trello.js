import axios from 'axios'
import { put } from 'redux-saga/effects'
import * as action from '../actions'

export function* createTrelloItem(act) {
  const { boardNo, userNo, userEmail, userName, title } = act.payload
  try {
    const respData = yield axios.post('trello/create', {
      boardNo,
      userNo,
      userEmail,
      userName,
      title
    })
    yield put(action.createTrelloItemSuccess(respData.data.item))
  } catch (err) {
    console.log('createTrelloItem err ----')
  }
}

export function* getTrelloList(act) {
  yield put(action.loadingStart())
  try {
    const respData = yield axios.get('trello/get', { params: { boardNo: act.boardNo } })
    yield put(action.getTrelloListSuccess(respData.data.list))
    yield put(action.loadingFinished())
  } catch (err) {
    console.log('getTrelloList err ----')
    yield put(action.loadingFinished())
  }
}

export function* updateTrelloItem(act) {
  const { _id, updateTitle } = act.payload
  yield put(action.loadingStart())
  try {
    const respData = yield axios.put('trello/update', { _id, updateTitle })
    yield put(action.updateTrelloItemSuccess(respData.data.list))
    yield put(action.loadingFinished())
  } catch (err) {
    console.log('updateTrelloItem err ----')
    yield put(action.loadingFinished())
  }
}

export function* deleteTrelloItem(act) {
  const { _id, confirmTitle } = act.params
  try {
    const respData = yield axios.delete('trello/delete', { params: { _id, confirmTitle } })
    yield put(action.deleteTrelloItemSuccess(respData.data._id))
  } catch (err) {
    console.log('updateTrelloItem err ----')
  }
}
