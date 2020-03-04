import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../actions/index'

export function* getBoardList(action) {
  yield put(actions.loadingStart())
  try {
    const respData = yield axios.get('boards/get', {
      params: { userNo: action.userNo }
    })
    yield put(actions.getBoardsSuccess(respData.data.list))
    yield put(actions.loadingFinished())
  } catch (err) {
    console.log('getBoardList err ----')
    yield put(actions.loadingFinished())
  }
}

export function* createBoardItem(action) {
  try {
    const respData = yield axios.post('boards/create', action.payload)
    yield localStorage.setItem('trello', JSON.stringify(respData.data.list))
    yield put(actions.createBoardSuccess(respData.data.list))
  } catch (err) {
    console.log('createBoardItem err ----')
  }
}
