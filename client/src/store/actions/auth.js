import * as types from 'store/types'

export const loginStart = payload => {
  return {
    type: types.LOGIN_START,
    user: {
      email: payload.email,
      password: payload.password
    }
  }
}

export const loginSuccess = () => {
  return {
    type: types.LOGIN_SUCCESS
  }
}

export const loginFail = () => {
  return {
    type: types.LOGIN_FAIL
  }
}

export const logout = () => {
  return { type: types.LOGOUT }
}

export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('user-data'))
    if (!token) {
      dispatch(logout())
    } else {
      const now = new Date().getTime() / 1000
      if (now >= user.expiration) {
        dispatch(logout())
      } else {
        dispatch(loginSuccess())
      }
    }
  }
}
