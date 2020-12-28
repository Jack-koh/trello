import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  createLoading: false,
  deleteLoading: false,
  list: [],
  searchText: '',
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
      case type.SET_BOARD_SEARCH_TEXT: draft['searchText'] = action.searchText; break;
      case type.INIT_BOARD_LIST: draft['list'] = []; break;
      case type.GET_BOARD_LIST_SUCCESS: getBoardListSuccess(draft, action.list); break;
      case type.CREATE_BOARD_ITEM_START: draft['createLoading'] = true; break;
      case type.CREATE_BOARD_ITEM_SUCCESS: createBoardItemSuccess(draft, action.item); break;
      case type.DELETE_BOARD_ITEM_START: draft['deleteLoading'] = true; break;
      case type.DELETE_BOARD_ITEM_SUCCESS: draft['deleteLoading'] = false; break;
      default:  draft = initialState; break;
    }
  });
};
