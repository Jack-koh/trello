import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as action from 'store/actions';

export function* getBoardList({ userNo }) {
  yield put(action.loadingStart());
  try {
    const response = yield axios.get('board/get', { params: { userNo } });
    yield put(action.getBoardListSuccess(response.data.list));
    yield put(action.loadingFinished());
  } catch (err) {
    console.log('getBoardList err ----');
    yield put(action.loadingFinished());
  }
}

export function* createBoardItem({ payload: { userNo, userEmail, userName, title, background, favorite } }) {
  try {
    const response = yield axios.post('board/create', {
      userNo,
      userEmail,
      userName,
      title,
      background,
      favorite,
    });
    yield localStorage.setItem('trello', JSON.stringify(response.data.item));
    yield put(action.createBoardItemSuccess(response.data.item));
  } catch (err) {
    console.log('createBoardItem err ----');
  }
}
