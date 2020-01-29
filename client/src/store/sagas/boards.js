import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import { requestRaw } from "shared/axios";

export function* createBoards(action) {
  try {
    const respData = yield requestRaw("boards/create", 'POST', action.board)
  } catch (err) {

  }
}
