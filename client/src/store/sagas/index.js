import * as type from "store/actions/types";
import { takeEvery } from "redux-saga/effects";
import { login } from "./auth";
import { getBoardItem } from "./boards";

export function* auth() {
  yield takeEvery(type.LOGIN_START, login);
}

export function* boards() {
  yield takeEvery(type.GET_BOARD_ITEMS_START, getBoardItem);
}
