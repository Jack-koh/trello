import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'
import { requestRaw } from 'shared/axios'

export function* login(action) {
    const respData = yield requestRaw('api/auth/login', 'POST', action.user)
    yield localStorage.setItem('token', respData.data.token)
    const userJSON = JSON.stringify({
        userId: respData.data.userId,
        expiration: respData.data.expiration,
        email: respData.data.email,
        name: respData.data.name,
    })
    yield localStorage.setItem('user', userJSON)
    yield put(actions.loginSuccess(respData.data))
}
