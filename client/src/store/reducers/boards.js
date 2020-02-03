import { updateObject } from "shared/utility";

const initialState = {
  loading: false,
  boardsList: []
};

const setBoarItems = (state, boardsList) => {
  console.log(boardsList);
  return updateObject(state, {
    loading: false,
    boardsList: boardsList
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
