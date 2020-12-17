import * as type from 'store/actions/types';
import produce from 'immer';
const initialState = {
  loading: false,
  errorMessage: '',
};

const loginStart = (draft) => {
  draft['loading'] = true;
};
const loginSuccess = (draft) => {
  draft['loading'] = false;
};
const loginFail = (draft, errorMessage) => {
  draft['loading'] = false;
  draft['errorMessage'] = errorMessage;
};
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user-data');
};

export const reducer = (state = initialState, action) => {
  // prettier-ignore
  return produce(state, (draft) => {
    switch (action.type) {
      case type.RESET_ERROR: draft['errorMessage'] = ''; break;
      case type.LOGIN_SUCCESS: loginSuccess(draft, action.user); break;
      case type.LOGIN_FAIL: loginFail(draft, action.errorMessage); break;
      case type.LOGIN_START: loginStart(draft); break; 
      case type.LOGOUT: logout(draft); break;
      default: draft; break;
    }
  });
};
