import * as type from "store/actions/types";
export const getBoardsStart = () => {
  const userData = JSON.parse(localStorage.getItem("user-data"));
  if (!!userData) {
    return {
      type: type.GET_BOARDS_START,
      userNo: userData.userNo
    };
  } else {
    return {
      type: type.GET_BOARDS_FAIL
    };
  }
};

export const getBoardsSuccess = payload => {
  return {
    type: type.GET_BOARDS_SUCCESS,
    items: payload
  };
};

export const createBoardStart = payload => {
  return {
    type: type.CREATE_BOARD_START,
    payload
  };
};

export const createBoardSuccess = payload => {
  return {
    type: type.CREATE_BOARD_SUCCESS,
    item: payload
  };
};
