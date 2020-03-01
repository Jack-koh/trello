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
  try {
    const respData = yield axios.get('trello/get', { params: action.params })
    yield put(actions.getTrellosListsSuccess(respData.data.list))
  } catch (err) {
    console.log('getTrelloList err ----')
  }
}

export function* updateTrelloItem(action) {
  try {
    const respData = yield axios.put('trello/update', action.payload)
    yield put(actions.updateTrelloItemSuccess(respData.data.list))
  } catch (err) {
    console.log('updateTrelloItem err ----')
  }
}
