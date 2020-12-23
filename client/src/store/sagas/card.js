import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from 'store/actions';

export function* createCard({ payload: { trelloNo, title } }) {
  try {
    const response = yield axios.post('cards/create', { trelloNo, title });
    yield put(actions.createCardSuccess(response.data.item));
  } catch (err) {
    console.log({ message: 'createCard err ----', err });
  }
}

export function* dragCardEnd({ payload: { item, source, destination } }) {
  try {
    yield axios.put('cards/drag', { item, source, destination });
  } catch (err) {
    console.log({ message: 'dragCardEnd err ----', err });
  }
}

export function* updateCard({ item }) {
  try {
    yield axios.put('cards/update', item);
  } catch (err) {
    console.log({ message: 'updateCard err ----', err });
  }
}

export function* deleteCard({ payload: { trelloNo, cardNo } }) {
  try {
    yield axios.delete('cards/delete', { params: { trelloNo, cardNo } });
    yield put(actions.deleteCardItemSuccess({ trelloNo, cardNo }));
  } catch (err) {
    console.log({ message: 'deleteCard err ----', err });
  }
}
