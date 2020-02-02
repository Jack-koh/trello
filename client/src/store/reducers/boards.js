import { updateObject } from "shared/utility";

const initialState = {
  loading: false
};

const setBoarItems = (state, action) => {
  console.log(action);
  return updateObject(state, {
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOARD_ITEMS_SUCCESS":
      return setBoarItems();
  }
};
