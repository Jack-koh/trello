import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* login(action) {
  try {
    const respData = yield axios.post("auth/login", action.user);
    yield localStorage.setItem("token", respData.data.token);
    const userJSON = JSON.stringify({
      userId: respData.data.userId,
      expiration: respData.data.expiration,
      email: respData.data.email,
      name: respData.data.name,
      userNo: respData.data.userNo
    });
    yield localStorage.setItem("user-data", userJSON);
    yield put(actions.loginSuccess());
  } catch (err) {
    yield put(actions.loginFail());
    console.log("Login Fail -----");
  }
}
