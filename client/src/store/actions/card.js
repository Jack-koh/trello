import * as type from 'store/actions/types';

export const initCardList = () => {
  return { type: type.INIT_CARD_LIST };
};

export const getCardListSuccess = (list) => {
  return { type: type.GET_CARD_LIST_SUCCESS, list };
};

export const createCardStart = ({ trelloNo, title }) => {
  return { type: type.CREATE_CARD_START, payload: { trelloNo, title } };
};

export const createCardSuccess = (item) => {
  return { type: type.CREATE_CARD_SUCCESS, item };
};

export const updateCardStart = (item) => {
  return { type: type.UPDATE_CARD_START, item };
};

export const dragCardEnd = ({ item, source, destination }) => {
  return { type: type.DRAG_CARD_END, payload: { item, source, destination } };
};
