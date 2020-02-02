import { takeEvery } from "redux-saga/effects";
import { login } from "./auth";
import { createBoards, getBoardItem } from "./boards";

export function* auth() {
  yield takeEvery("LOGIN_START", login);
}

export function* boards() {
  yield takeEvery("CREATE_BOARD_START", createBoards);
  yield takeEvery("GET_BOARD_ITEMS_START", getBoardItem);
}
