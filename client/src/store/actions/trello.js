import * as type from './types';

export const getTrelloListsStart = params => {
  return {
    type: type.GET_TRELLO_LIST_START,
    params
  };
};

export const getTrellosListsSuccess = payload => {
  return {
    type: type.GET_TRELLO_LIST_SUCCESS,
    list: payload
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
