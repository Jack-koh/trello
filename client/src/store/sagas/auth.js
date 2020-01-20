import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import { requestRaw } from 'shared/axios'

export function* login(action) {
    const resData = yield requestRaw('api/auth/login', 'POST', action.user);
    yield localStorage.setItem('token', resData.data.token)
    yield localStorage.setItem('userId', resData.data.userId)
    yield localStorage.setItem('expiration', resData.data.expiration)
    yield put(actions.loginSucceed(resData.data))
}