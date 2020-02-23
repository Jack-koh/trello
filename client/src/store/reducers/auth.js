import * as type from "store/actions/types";
import { updateObject } from "shared/utility";

const initialState = {
  loading: false
};

const loginStart = (state, action) => {
  return updateObject(state, {
    loading: true
  });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    loading: false
  });
};

const logout = (state, action) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user-data");
  return updateObject(state, {
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return loginSuccess(state, action.user);
    case type.LOGIN_FAIL:
      return loginFail();
    case type.LOGIN_START:
      return loginStart();
    case type.LOGOUT:
      return logout();
    default:
      return state;
  }
};

export default reducer;
