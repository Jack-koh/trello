import * as type from 'store/types'
import produce from 'immer'

const initialState = {
  loading: false
}

const loginStart = draft => {
  draft['loading'] = true
}
const loginSuccess = draft => {
  draft['loading'] = false
}
const loginFail = draft => {
  draft['loading'] = false
}
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user-data')
}

export const reducer = (state = initialState, act) => {
  return produce(state, draft => {
    switch (act.type) {
      case type.LOGIN_SUCCESS:
        return loginSuccess(draft, act.user)
      case type.LOGIN_FAIL:
        return loginFail(draft)
      case type.LOGIN_START:
        return loginStart(draft)
      case type.LOGOUT:
        return logout(draft)
      default:
        return draft
    }
  })
}
