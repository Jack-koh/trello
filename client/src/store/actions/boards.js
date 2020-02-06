export const getBoardItemStart = () => {
  const userData = JSON.parse(localStorage.getItem("user-data"));
  return {
    type: "GET_BOARD_ITEMS_START",
    userNo: userData.userNo
  };
};

export const getBoardItemsSuccess = payload => {
  return {
    type: "GET_BOARD_ITEMS_SUCCESS",
    items: payload
  };
};
