import { updateObject } from "shared/utility";

const initialState = {
  userNo: null,
  boardNo: null,
  title: null,
  background: {
    type: "",
    name: ""
  },
  regDate: null,
  updateDate: null
};

const setTrello = (state, data) => {
  return updateObject(state, {
    userNo: data.userNo,
    boardNo: data.boardNo,
    title: data.title,
    background: {
      type: data.background.type,
      name: data.background.name
    },
    regDate: data.createdAt,
    updateDate: data.updatedAt
  });
};

const initTrello = (state, data) => {
  return updateObject(state, {
    userNo: null,
    boardNo: null,
    title: null,
    background: {
      type: "",
      name: ""
    },
    regDate: null,
    updateDate: null
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRELLO_ITEM":
      return setTrello(state, action.data);
    case "INIT_TRELLO_ITEM":
      return initTrello();
    default:
      return state;
  }
};

export default reducer;
