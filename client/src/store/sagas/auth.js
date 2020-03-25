import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as action from 'store/actions';

export function* login({ user }) {
  try {
    const response = yield axios.post('auth/login', user);
    const { token, userId, expiration, email, name, userNo } = response.data;

    yield localStorage.setItem('token', token);
    yield localStorage.setItem('user-data', JSON.stringify({ userId, expiration, email, name, userNo }));

    yield put(action.loginSuccess());
  } catch (err) {
    yield put(action.loginFail());
    console.log('Login Fail -----');
  }
}
