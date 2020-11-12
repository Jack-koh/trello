import * as type from 'store/actions/types';

export const loginStart = (payload) => {
  return {
    type: type.LOGIN_START,
    user: {
      email: payload.email,
      password: payload.password,
    },
  };
};

export const loginSuccess = () => {
  return {
    type: type.LOGIN_SUCCESS,
  };
};

export const loginFail = () => {
  return {
    type: type.LOGIN_FAIL,
  };
};

export const logout = () => {
  return { type: type.LOGOUT };
};

export const authCheck = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user-data'));
    console.log(new Date().getTime() / 1000);
    console.log(user.expiration);
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
