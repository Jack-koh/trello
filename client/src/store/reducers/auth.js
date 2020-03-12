import * as type from 'store/types'
import { updateObject } from 'shared/utility'

const initialState = {
  loading: false
}

const loginStart = state => {
  return updateObject(state, {
    loading: true
  })
}

const loginSuccess = state => {
  return updateObject(state, {
    loading: false
  })
}

const loginFail = state => {
  return updateObject(state, {
    loading: false
  })
}

const logout = state => {
  localStorage.removeItem('token')
  localStorage.removeItem('user-data')
  return updateObject(state, {
    loading: false
  })
}

export const reducer = (state = initialState, act) => {
  switch (act.type) {
    case type.LOGIN_SUCCESS:
      return loginSuccess(state, act.user)
    case type.LOGIN_FAIL:
      return loginFail()
    case type.LOGIN_START:
      return loginStart()
    case type.LOGOUT:
      return logout()
    default:
      return state
  }
}
