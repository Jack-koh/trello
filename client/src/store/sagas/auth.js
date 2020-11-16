import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as actions from 'store/actions'

export function* login({ user }) {
  try {
    const response = yield axios.post('auth/login', user)
    const { token, userId, expiration, email, name, userNo } = response.data

    yield localStorage.setItem('token', token)
    yield localStorage.setItem('user-data', JSON.stringify({ userId, expiration, email, name, userNo }))

    yield put(actions.loginSuccess())
  } catch (err) {
    yield put(actions.loginFail())
    console.log('Login Fail -----')
  }
}
