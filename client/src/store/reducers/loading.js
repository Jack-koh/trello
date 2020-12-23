import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  progress: false,
};

const loadingStart = (draft) => {
  draft['progress'] = true;
};

const loadingFinished = (draft) => {
  draft['progress'] = false;
};

export const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    // prettier-ignore
    switch (action.type) {
      case type.GET_BOARD_LIST_START: loadingStart(draft); break;
      case type.GET_BOARD_LIST_SUCCESS: loadingFinished(draft); break;
      case type.UPDATE_BOARD_ITEM_START: loadingStart(draft); break;
      case type.UPDATE_BOARD_ITEM_SUCCESS: loadingFinished(draft); break;
      case type.GET_TRELLO_LIST_START: loadingStart(draft); break;
      case type.GET_TRELLO_LIST_SUCCESS: loadingFinished(draft); break;
      case type.UPDATE_TRELLO_ITEM_START: loadingStart(draft); break;
      case type.UPDATE_TRELLO_ITEM_SUCCESS: loadingFinished(draft); break;
      default: draft;
    }
  });
};
