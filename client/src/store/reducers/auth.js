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
    case "LOGIN_SUCCEED":
      return loginSuccess(state, action.user);
    case "LOGIN_FAIL":
      return loginFail();
    case "LOGIN_START":
      return loginStart();
    case "LOGOUT":
      return logout();
    default:
      return state;
  }
};

export default reducer;
