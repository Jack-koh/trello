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
  // _id -> trello 테이블 _id trello 테이블에 imbeded형식
  const { trelloId, trelloNo, title } = act.payload
  try {
    const respData = yield axios.post('card/create', { trelloId, trelloNo, title })
    yield put(action.createCardSuccess(respData.data.item))
  } catch (err) {
    console.log('createCard err ----')
  }
}
