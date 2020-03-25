import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as action from 'store/actions';

export function* createTrelloItem({ payload: { boardNo, userNo, title } }) {
  try {
    const response = yield axios.post('trello/create', { boardNo, userNo, title });
    yield put(action.createTrelloItemSuccess(response.data.item));
  } catch (err) {
    console.log('createTrelloItem err ----');
  }
}

export function* getTrelloList({ boardNo }) {
  yield put(action.loadingStart());
  try {
    const response = yield axios.get('trello/get', { params: { boardNo } });
    yield put(action.getTrelloListSuccess(response.data.list));
    yield put(action.loadingFinished());
  } catch (err) {
    console.log('getTrelloList err ----');
    yield put(action.loadingFinished());
  }
}

export function* updateTrelloItem({ payload: { _id, updateTitle } }) {
  yield put(action.loadingStart());
  try {
    const response = yield axios.put('trello/update', { _id, updateTitle });
    yield put(action.updateTrelloItemSuccess(response.data.list));
    yield put(action.loadingFinished());
  } catch (err) {
    console.log('updateTrelloItem err ----');
    yield put(action.loadingFinished());
  }
}

export function* deleteTrelloItem({ params: { _id, confirmTitle } }) {
  try {
    const response = yield axios.delete('trello/delete', { params: { _id, confirmTitle } });
    yield put(action.deleteTrelloItemSuccess(response.data._id));
  } catch (err) {
    console.log('updateTrelloItem err ----');
  }
}

export function* updateCardItem({ payload: destination, source, draggableId }) {
  try {
    yield axios.put('trello/update/cards', { destination, source, draggableId });
  } catch (err) {
    console.log('updateTrelloItem err ----');
  }
}
