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
  const { userNo, userEmail, userName, title, background, favorite } = action.payload
  try {
    const respData = yield axios.post('boards/create', {
      userNo,
      userEmail,
      userName,
      title,
      background,
      favorite
    })
    yield localStorage.setItem('trello', JSON.stringify(respData.data.item))
    yield put(actions.createBoardSuccess(respData.data.item))
  } catch (err) {
    console.log('createBoardItem err ----')
  }
}
