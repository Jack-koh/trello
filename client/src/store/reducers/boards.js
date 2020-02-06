import { updateObject } from "shared/utility";

const initialState = {
  list: []
};

const setBoarItems = (state, list) => {
  return updateObject(state, {
    list: list
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOARD_ITEMS_SUCCESS":
      return setBoarItems(state, action.items);
    default:
      return state;
  }
};

export default reducer;
