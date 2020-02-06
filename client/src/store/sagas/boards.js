import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import { requestRaw } from "shared/axios";

export function* getBoardItem(action) {
  try {
    const param = { userNo: action.userNo };
    const respData = yield requestRaw("boards/get", "GET", param);
    yield put(actions.getBoardItemsSuccess(respData.data.list));
  } catch (err) {}
}
