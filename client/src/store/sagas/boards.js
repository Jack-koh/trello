import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

export function* getBoardItems(action) {
  try {
    const respData = yield axios.get("boards/get", {
      params: { userNo: action.userNo }
    });
    yield put(actions.getBoardsSuccess(respData.data.list));
  } catch (err) {
    console.log("getBoardItems err ----");
  }
}

export function* createBoardItem(action) {
  try {
    const respData = yield axios.post("boards/create", action.payload);
    yield localStorage.setItem("trello", JSON.stringify(respData.data.list));
    yield put(actions.createBoardSuccess(respData.data.list));
  } catch (err) {
    console.log("createBoardItem err ----");
  }
}
