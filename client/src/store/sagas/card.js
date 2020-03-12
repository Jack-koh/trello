import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as action from '../actions'

export function* createCard(act) {
  const { trelloId, title } = act.payload
  yield put(action.loadingStart())
  try {
    const respData = yield axios.post('card/create', { trelloId, title })
    yield put(action.createCardSuccess(respData.data.item))
    yield put(action.loadingFinished())
  } catch (err) {
    console.log('createBoardItem err ----')
    yield put(action.loadingFinished())
  }
}
