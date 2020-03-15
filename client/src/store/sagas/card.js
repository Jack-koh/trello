import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as action from '../actions'

export function* createCard(act) {
  // _id -> trello 테이블 _id trello 테이블에 imbeded형식
  const { _id, title } = act.payload
  yield put(action.loadingStart())
  try {
    const respData = yield axios.post('card/create', { _id, title })
    yield put(action.createCardSuccess(respData.data.item))
    yield put(action.loadingFinished())
  } catch (err) {
    console.log('createBoardItem err ----')
    yield put(action.loadingFinished())
  }
}
