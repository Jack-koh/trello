export const setTrelloItem = payload => {
  return {
    type: "SET_TRELLO_ITEM",
    data: payload
  };
};

export const initTrelloItem = payload => {
  return {
    type: "INIT_TRELLO_ITEM"
  };
};
