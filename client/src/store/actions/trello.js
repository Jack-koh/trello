import * as type from 'store/actions/types';

export const getTrelloListStart = (boardNo) => {
  return {
    type: type.GET_TRELLO_LIST_START,
    boardNo,
  };
};

export const getTrelloListSuccess = (list) => {
  return {
    type: type.GET_TRELLO_LIST_SUCCESS,
    list,
  };
};

export const createTrelloItemStart = ({ boardNo, userNo, title }) => {
  return {
    type: type.CREATE_TRELLO_ITEM_START,
    payload: { boardNo, userNo, title },
  };
};

export const createTrelloItemSuccess = (item) => {
  return {
    type: type.CREATE_TRELLO_ITEM_SUCCESS,
    item,
  };
};

export const updateTrelloItemStart = ({ _id, updateTitle }) => {
  return {
    type: type.UPDATE_TRELLO_ITEM_START,
    payload: { _id, updateTitle },
  };
};

export const updateTrelloItemSuccess = (item) => {
  return {
    type: type.UPDATE_TRELLO_ITEM_SUCCESS,
    item,
  };
};

export const deleteTrelloItemStart = ({ _id, confirmTitle }) => {
  return {
    type: type.DELETE_TRELLO_ITEM_START,
    params: {
      _id,
      confirmTitle,
    },
  };
};

export const deleteTrelloItemSuccess = (_id) => {
  return {
    type: type.DELETE_TRELLO_ITEM_SUCCESS,
    _id,
  };
};

export const updateCardItem = ({ destination, source, draggableId }) => {
  return {
    type: type.UPDATE_CARD_ITEM,
    payload: { destination, source, draggableId },
  };
};

export const initTrelloList = () => {
  return {
    type: type.INIT_TRELLO_LIST,
  };
};
