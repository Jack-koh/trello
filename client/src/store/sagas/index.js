import { takeEvery } from 'redux-saga/effects'
import { login } from './auth'

export function* auth() {
    yield takeEvery('LOGIN', login)
}