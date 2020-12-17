import { put } from 'redux-saga/effects';
import axios from 'axios';
import history from 'shared/history';
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
    yield put(actions.createBoardItemSuccess(response.data.item));

    yield localStorage.setItem(
      'trello',
      JSON.stringify({
        backgroundName: response.data.item.background_name,
        backgroundType: response.data.item.background_type,
        boardNo: response.data.item.board_no,
        favorite: response.data.item.favorite,
        regDate: response.data.item.reg_date,
        title: response.data.item.title,
      })
    );
    history.push(`/main/trello/${title}`);
  } catch (err) {
    console.log('createBoardItem err ----');
  }
}

export function* deleteBoardItem({ boardNo }) {
  try {
    yield axios.delete('boards/delete', { params: { boardNo } });
    yield put(actions.deleteBoardItemSuccess());
    yield localStorage.removeItem('trello');
    history.push(`/main.board`);
  } catch (err) {
    console.log('createBoardItem err ----');
  }
}
