import { updateObject } from "shared/utility";

const initialState = {
  name: null
};

const setDialog = (state, action) => {
  return updateObject(state, {
    name: action.name
  });
};

const closeDialog = (state, action) => {
  return updateObject(state, {
    name: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DIALOG":
      return setDialog(state, action);
    case "CLOSE_DIALOG":
      return closeDialog();
    default:
      return state;
  }
};

export default reducer;
