import axios from 'axios';
import { put, select } from 'redux-saga/effects';
import * as actions from 'store/actions';

export function* getTrelloList({ boardNo }) {
  const searchText = yield select((state) => state.trello.searchText);

  try {
    const response = yield axios.get('trellos/get', { params: { boardNo, searchText } });
    const { trelloList, cardList } = response.data;
    yield put(actions.getTrelloListSuccess(trelloList));
    yield put(actions.getCardListSuccess(cardList));
  } catch (err) {
    console.log({ message: 'getTrelloList err ----', err });
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
  try {
    const response = yield axios.put('trellos/update', { trelloNo, title });
    yield put(actions.updateTrelloItemSuccess(response.data.list));
  } catch (err) {
    console.log({ message: 'updateTrello err ----', err });
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
    yield axios.delete('trellos/delete', { params: { trelloNo, boardNo } });
    yield put(actions.deleteTrelloItemSuccess(trelloNo));
  } catch (err) {
    console.log({ message: 'updateTrello err ----', err });
  }
}
