import axios from 'axios';
import { put } from 'redux-saga/effects';
import * as actions from '../actions';

export function* createTrelloList(action) {
  try {
    const respData = yield axios.post('trello/create', action.payload);
    yield put(actions.createTrelloListSuccess(respData.data.list));
  } catch (err) {
    console.log('createTrelloList err ----');
  }
}

export function* getTrelloLists(action) {
  try {
    const respData = yield axios.get('trello/get', { params: action.params });
    yield put(actions.getTrellosListsSuccess(respData.data.list));
  } catch (err) {
    console.log('getTrelloLists err ----');
  }
}
