import * as actions from "../actions";
import { put } from "redux-saga/effects";
import axios from "axios";

export function* createTrelloList(action) {
  try {
    const respData = yield axios.post("trello/create", action.payload);
    yield put(actions.createTrelloListSuccess(respData.data.list));
  } catch (err) {
    console.log("createTrelloList err ----");
  }
}
