import axios from 'axios'
import { put } from 'redux-saga/effects'
import * as actions from 'store/actions'

export function* getTrelloList({ boardNo }) {
  yield put(actions.loadingStart())
  try {
    const response = yield axios.get('trello/get', { params: { boardNo } })
    yield put(actions.getTrelloListSuccess(response.data.list))
    yield put(actions.loadingFinished())
  } catch (err) {
    console.log('getTrelloList err ----')
    yield put(actions.loadingFinished())
  }
}

export function* createTrello({ payload: { boardNo, title } }) {
  try {
    const response = yield axios.post('trello/create', { boardNo, title })
    yield put(actions.createTrelloItemSuccess(response.data.item))
  } catch (err) {
    console.log('createTrello err ----')
  }
}

export function* updateTrello({ payload: { _id, updateTitle } }) {
  yield put(actions.loadingStart())
  try {
    const response = yield axios.put('trello/update', { _id, updateTitle })
    yield put(actions.updateTrelloItemSuccess(response.data.list))
    yield put(actions.loadingFinished())
  } catch (err) {
    console.log('updateTrello err ----')
    yield put(actions.loadingFinished())
  }
}

export function* deleteTrello({ params: { _id, confirmTitle } }) {
  try {
    const response = yield axios.delete('trello/delete', { params: { _id, confirmTitle } })
    yield put(actions.deleteTrelloItemSuccess(response.data._id))
  } catch (err) {
    console.log('updateTrello err ----')
  }
}

export function* updateCardItem({ payload: destination, source, draggableId }) {
  try {
    yield axios.put('trello/update/cards', { destination, source, draggableId })
  } catch (err) {
    console.log('updateTrello err ----')
  }
}
