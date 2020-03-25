import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  list: [],
  loading: false,
};

const loading = (draft) => {
  draft['loading'] = true;
};

const initCardList = (draft) => {
  draft['list'] = [];
};

const getCardListSuccess = (draft, list) => {
  draft['list'] = list;
  draft['loading'] = false;
};

const createCardSuccess = (draft, item) => {
  draft['list'] = [...draft.list, item];
  draft['loading'] = false;
};

export const reducer = (state = initialState, act) => {
  return produce(state, (draft) => {
    switch (act.type) {
      case type.INIT_CARD_LIST:
        return initCardList(draft);
      case type.GET_CARD_LIST_START:
        return loading(draft);
      case type.GET_CARD_LIST_SUCCESS:
        return getCardListSuccess(draft, act.list);
      case type.CREATE_CARD_START:
        return loading(draft);
      case type.CREATE_CARD_SUCCESS:
        return createCardSuccess(draft, act.item);
      default:
        return draft;
    }
  });
};
