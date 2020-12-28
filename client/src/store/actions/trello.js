import * as type from 'store/actions/types';

export const setTrelloSearchText = (searchText) => {
  return { type: type.SET_TRELLO_SEARCH_TEXT, searchText };
};

export const setTrelloItemTitle = ({ trelloNo, title }) => {
  return { type: type.SET_TRELLO_ITEM_TITLE, payload: { trelloNo, title } };
};

export const getTrelloListStart = (boardNo) => {
  return { type: type.GET_TRELLO_LIST_START, boardNo };
};

export const getTrelloListSuccess = (list) => {
  return { type: type.GET_TRELLO_LIST_SUCCESS, list };
};

export const createTrelloStart = ({ boardNo, title }) => {
  return { type: type.CREATE_TRELLO_ITEM_START, payload: { boardNo, title } };
};

export const createTrelloItemSuccess = (item) => {
  return { type: type.CREATE_TRELLO_ITEM_SUCCESS, item };
};

export const updateTrelloItemStart = ({ trelloNo, title }) => {
  return { type: type.UPDATE_TRELLO_ITEM_START, payload: { trelloNo, title } };
};

export const updateTrelloItemSuccess = (item) => {
  return { type: type.UPDATE_TRELLO_ITEM_SUCCESS, item };
};

export const deleteTrelloItemStart = ({ trelloNo, boardNo }) => {
  return { type: type.DELETE_TRELLO_ITEM_START, payload: { trelloNo, boardNo } };
};

export const deleteTrelloItemSuccess = (trelloNo) => {
  return { type: type.DELETE_TRELLO_ITEM_SUCCESS, trelloNo };
};

export const dragTrelloEnd = ({ item, sourceIndex, destIndex }) => {
  return { type: type.DRAG_TRELLO_ITEM_END, payload: { item, sourceIndex, destIndex } };
};

export const initTrelloList = () => {
  return { type: type.INIT_TRELLO_LIST };
};
