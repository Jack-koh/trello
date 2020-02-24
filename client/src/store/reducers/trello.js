import * as type from "../actions/types";
import { updateObject } from "shared/utility";

const initialState = {
  loading: false,
  list: []
};

const loadingStart = state => {
  return updateObject(state, { loading: true });
};

const createTrelloListSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.CREATE_TRELLO_LIST_START:
      return loadingStart(state);
    case type.CREATE_TRELLO_LIST_SUCCESS:
      return createTrelloListSuccess(state, action.item);
    default:
      return state;
  }
};

export default reducer;
