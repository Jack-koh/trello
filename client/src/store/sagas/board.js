import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from 'store/actions';

export function* getBoardList() {
  const { userNo } = JSON.parse(localStorage.getItem('user-data'));
  yield put(actions.loadingStart());
  try {
    const response = yield axios.get('boards/get', { params: { userNo } });

    yield put(actions.getBoardListSuccess(response.data.list));
    yield put(actions.loadingFinished());
  } catch (err) {
    console.log('getBoardList err ----');
    yield put(actions.loadingFinished());
  }
}

export function* createBoardItem({
  payload: { userNo, title, backgroundType, backgroundName, favorite },
}) {
  try {
    const response = yield axios.post('boards/create', {
      userNo,
      title,
      backgroundType,
      backgroundName,
      favorite,
    });
    yield localStorage.setItem('trello', JSON.stringify(response.data.item));
    yield put(actions.createBoardItemSuccess(response.data.item));
  } catch (err) {
    console.log('createBoardItem err ----');
  }
}
