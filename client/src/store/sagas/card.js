import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as actions from 'store/actions'

export function* getCardList(action) {
  const { boardNo } = action
  try {
    const respData = yield axios.get('card/get', { params: { boardNo } })
    yield put(actions.getCardListSuccess(respData.data.list))
  } catch (err) {
    console.log('getCardList err ----')
  }
}

export function* createCard(action) {
  const { trelloId, title } = action.payload
  try {
    const respData = yield axios.post('card/create', { trelloId, title })
    yield put(actions.createCardSuccess(respData.data.item))
  } catch (err) {
    console.log('createCard err ----')
  }
}
