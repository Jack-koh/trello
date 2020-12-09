import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  createLoading: false,
  list: [],
};

const initBoardList = (draft) => {
  draft['list'] = [];
};

const loadingStart = (draft) => {
  draft['createLoading'] = true;
};

const getBoardListSuccess = (draft, list) => {
  draft['list'] = list;
};

const createBoardItemSuccess = (draft, item) => {
  draft['list'] = [...draft.list, item];
  draft['createLoading'] = false;
};

export const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    // prettier-ignore
    switch (action.type) {
      case type.INIT_BOARD_LIST: initBoardList(draft); break;
      case type.GET_BOARD_LIST_SUCCESS: getBoardListSuccess(draft, action.list); break;
      case type.CREATE_BOARD_ITEM_START: loadingStart(draft); break;
      case type.CREATE_BOARD_ITEM_SUCCESS: createBoardItemSuccess(draft, action.item); break;
      default:  draft = initialState; break;
    }
  });
};
