import * as type from "store/actions/types";
import { updateObject } from "shared/utility";

const initialState = {
  list: []
};

const setBoardItems = (state, list) => {
  return updateObject(state, { list });
};

const setInitBoardItem = state => {
  return updateObject(state, { list: [] });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_BOARD_ITEMS_SUCCESS:
      return setBoardItems(state, action.items);
    case type.GET_BOARD_ITEMS_FAIL:
      return setInitBoardItem(state);
    default:
      return state;
  }
};

export default reducer;
