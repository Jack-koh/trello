import axios from 'axios'
import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* createTrelloItem(action) {
  try {
    const respData = yield axios.post('trello/create', action.payload)
    yield put(actions.createTrelloItemSuccess(respData.data.list))
  } catch (err) {
    console.log('createTrelloItem err ----')
  }
}

export function* getTrelloList(action) {
  yield put(actions.loadingStart())
  try {
    const respData = yield axios.get('trello/get', { params: action.params })
    yield put(actions.getTrelloListSuccess(respData.data.list))
    yield put(actions.loadingFinished())
  } catch (err) {
    console.log('getTrelloList err ----')
    yield put(actions.loadingFinished())
  }
}

export function* updateTrelloItem(action) {
  yield put(actions.loadingStart())
  try {
    const respData = yield axios.put('trello/update', action.payload)
    yield put(actions.updateTrelloItemSuccess(respData.data.list))
    yield put(actions.loadingFinished())
  } catch (err) {
    console.log('updateTrelloItem err ----')
    yield put(actions.loadingFinished())
  }
}
