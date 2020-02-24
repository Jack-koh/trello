import * as type from "./types";

export const getTrelloLists = boardNo => {
  return {
    type: type.GET_TRELLO_LIST_START,
    boardNo
  };
};

export const createTrelloListStart = payload => {
  return {
    type: type.CREATE_TRELLO_LIST_START,
    payload
  };
};

export const createTrelloListSuccess = payload => {
  return {
    type: type.CREATE_TRELLO_LIST_SUCCESS,
    item: payload
  };
};
