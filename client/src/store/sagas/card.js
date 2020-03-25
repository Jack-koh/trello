import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as action from 'store/actions';

export function* getCardList({ boardNo }) {
  try {
    const respData = yield axios.get('card/get', { params: { boardNo } });
    yield put(action.getCardListSuccess(respData.data.list));
  } catch (err) {
    console.log('getCardList err ----');
  }
}

export function* createCard({ payload: trelloId, title }) {
  try {
    const respData = yield axios.post('card/create', { trelloId, title });
    yield put(action.createCardSuccess(respData.data.item));
  } catch (err) {
    console.log('createCard err ----');
  }
}
