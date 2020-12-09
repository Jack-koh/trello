import axios from 'axios';
import { put, select } from 'redux-saga/effects';
import * as actions from 'store/actions';

export function* getTrelloList({ boardNo }) {
  yield put(actions.loadingStart());
  try {
    const response = yield axios.get('trellos/get', { params: { boardNo } });
    const { trelloList, cardList } = response.data;
    yield put(actions.getTrelloListSuccess(trelloList));
    yield put(actions.getCardListSuccess(cardList));
    yield put(actions.loadingFinished());
  } catch (err) {
    console.log({ message: 'getTrelloList err ----', err });
    yield put(actions.loadingFinished());
  }
}

export function* createTrello({ payload: { boardNo, title } }) {
  try {
    const response = yield axios.post('trellos/create', { boardNo, title });
    yield put(actions.createTrelloItemSuccess(response.data.item));
  } catch (err) {
    console.log({ message: 'createTrello err ----', err });
  }
}

export function* updateTrello({ payload: { trelloNo, title } }) {
  yield put(actions.loadingStart());
  try {
    const response = yield axios.put('trellos/update', { trelloNo, title });
    yield put(actions.updateTrelloItemSuccess(response.data.list));
    yield put(actions.loadingFinished());
  } catch (err) {
    console.log({ message: 'updateTrello err ----', err });
    yield put(actions.loadingFinished());
  }
}

export function* dragTrello({ payload: { item, sourceIndex, destIndex } }) {
  try {
    yield axios.put('trellos/drag', { item, sourceIndex, destIndex });
  } catch (err) {
    console.log({ message: 'dragTrello err ----', err });
  }
}

export function* deleteTrello({ payload: { trelloNo, boardNo } }) {
  try {
    const response = yield axios.delete('trellos/delete', {
      params: { trelloNo, boardNo },
    });
    yield put(actions.deleteTrelloItemSuccess(response.data.trelloNo));
  } catch (err) {
    console.log({ message: 'updateTrello err ----', err });
  }
}
