import * as types from 'store/types'
import { updateObject } from 'shared/utility';

const initialState = {
  loading: false
};

const loginStart = state => {
  return updateObject(state, {
    loading: true
  });
};

const loginSuccess = state => {
  return updateObject(state, {
    loading: false
  });
};

const loginFail = state => {
  return updateObject(state, {
    loading: false
  });
};

const logout = state => {
  localStorage.removeItem('token');
  localStorage.removeItem('user-data');
  return updateObject(state, {
    loading: false
  });
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return loginSuccess(state, action.user);
    case types.LOGIN_FAIL:
      return loginFail();
    case types.LOGIN_START:
      return loginStart();
    case types.LOGOUT:
      return logout();
    default:
      return state;
  }
};