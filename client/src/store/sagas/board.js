import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as action from '../actions/index'

export function* getBoardList(act) {
  yield put(action.loadingStart())
  try {
    const respData = yield axios.get('board/get', {
      params: { userNo: act.userNo }
    })
    yield put(action.getBoardListSuccess(respData.data.list))
    yield put(action.loadingFinished())
  } catch (err) {
    console.log('getBoardList err ----')
    yield put(action.loadingFinished())
  }
}

export function* createBoardItem(act) {
  const { userNo, userEmail, userName, title, background, favorite } = act.payload
  try {
    const respData = yield axios.post('board/create', {
      userNo,
      userEmail,
      userName,
      title,
      background,
      favorite
    })
    yield localStorage.setItem('trello', JSON.stringify(respData.data.item))
    yield put(action.createBoardItemSuccess(respData.data.item))
  } catch (err) {
    console.log('createBoardItem err ----')
  }
}
