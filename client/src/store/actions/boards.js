export const createBoardStart = payload => {
  return {
    type: "CREATE_BOARD_START",
    board: payload
  };
};

export const createBoardSuccess = payload => {
  return {
    type: "CREATE_BOARD_SUCCESS"
  };
};

export const getBoardItemStart = payload => {
  return {
    type: "GET_BOARD_ITEMS_START",
    userNo: payload
  };
};

export const getBoardItemsSuccess = payload => {
  return {
    type: "GET_BOARD_ITEMS_SUCCESS",
    items: payload
  };
};
