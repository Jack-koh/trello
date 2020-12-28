import * as type from 'store/actions/types';

export const setBoardSearchText = (searchText) => {
  return { type: type.SET_BOARD_SEARCH_TEXT, searchText };
};

export const getBoardListStart = () => {
  return { type: type.GET_BOARD_LIST_START };
};

export const getBoardListSuccess = (list) => {
  return { type: type.GET_BOARD_LIST_SUCCESS, list };
};

export const createBoardItemStart = (payload) => {
  const { userNo, title, backgroundType, backgroundName, favorite } = payload;
  return {
    type: type.CREATE_BOARD_ITEM_START,
    payload: { userNo, title, backgroundType, backgroundName, favorite },
  };
};

export const createBoardItemSuccess = (item) => {
  return { type: type.CREATE_BOARD_ITEM_SUCCESS, item };
};

export const updateBoardItemStart = (item) => {
  console.log(item);
  return { type: type.UPDATE_BOARD_ITEM_START, item };
};

export const updateBoardItemSuccess = () => {
  return { type: type.UPDATE_BOARD_ITEM_SUCCESS };
};

export const deleteBoardItemStart = (boardNo) => {
  return { type: type.DELETE_BOARD_ITEM_START, boardNo };
};

export const deleteBoardItemSuccess = () => {
  return { type: type.DELETE_BOARD_ITEM_SUCCESS };
};

export const initBoardList = () => {
  return { type: type.INIT_BOARD_LIST };
};
