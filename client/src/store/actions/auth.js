export const loginStart = payload => {
  return {
    type: "LOGIN_START",
    user: {
      email: payload.email,
      password: payload.password
    }
  };
};

export const loginSuccess = payload => {
  return {
    type: "LOGIN_SUCCEED"
  };
};

export const loginFail = () => {
  return {
    type: "LOGIN_FAIL"
  };
};

export const logout = () => {
  return { type: "LOGOUT" };
};

export const authCheck = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user-data"));
    if (!token) {
      dispatch(logout());
    } else {
      const now = new Date().getTime() / 1000;
      if (now >= user.expiration) {
        dispatch(logout());
      } else {
        dispatch(loginSuccess());
      }
    }
  };
};
