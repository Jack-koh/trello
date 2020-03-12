import { put } from 'redux-saga/effects'
import axios from 'axios'
import * as action from '../actions/index'

export function* login(act) {
  try {
    const respData = yield axios.post('auth/login', act.user)
    yield localStorage.setItem('token', respData.data.token)
    const userJSON = JSON.stringify({
      userId: respData.data.userId,
      expiration: respData.data.expiration,
      email: respData.data.email,
      name: respData.data.name,
      userNo: respData.data.userNo
    })
    yield localStorage.setItem('user-data', userJSON)
    yield put(action.loginSuccess())
  } catch (err) {
    yield put(action.loginFail())
    console.log('Login Fail -----')
  }
}
