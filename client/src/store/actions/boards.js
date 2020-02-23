import * as type from "store/actions/types";
export const getBoardItemStart = () => {
  const userData = JSON.parse(localStorage.getItem("user-data"));
  if (!!userData) {
    return {
      type: type.GET_BOARD_ITEMS_START,
      userNo: userData.userNo
    };
  } else {
    return {
      type: type.GET_BOARD_ITEMS_FAIL
    };
  }
};

export const getBoardItemsSuccess = payload => {
  return {
    type: type.GET_BOARD_ITEMS_SUCCESS,
    items: payload
  };
};
