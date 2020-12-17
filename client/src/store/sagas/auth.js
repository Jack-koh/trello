import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from 'store/actions';

export function* login({ user }) {
  try {
    const response = yield axios.post('auth/login', user);

    const { errorMessage, token, userId, expiration, email, name, userNo } = response.data;

    if (errorMessage) {
      yield put(actions.loginFail(errorMessage));
    } else {
      yield localStorage.setItem('token', token);
      yield localStorage.setItem(
        'user-data',
        JSON.stringify({ userId, expiration, email, name, userNo })
      );

      yield put(actions.loginSuccess());
    }
  } catch (err) {
    console.log('Login Fail -----');
  }
}
