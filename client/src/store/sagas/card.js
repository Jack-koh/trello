import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as action from 'store/actions'

export function* getCardList(act) {
  try {
    const respData = yield axios.get('card/get', { params: { boardNo: act.boardNo } })
    yield put(action.getCardListSuccess(respData.data.list))
  } catch (err) {
    console.log('getCardList err ----')
  }
}

export function* createCard(act) {
  const { trelloId, title } = act.payload
  try {
    const respData = yield axios.post('card/create', { trelloId, title })
    yield put(action.createCardSuccess(respData.data.item))
  } catch (err) {
    console.log('createCard err ----')
  }
}
