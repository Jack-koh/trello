import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  list: [],
  loading: false,
  searchText: '',
};

const createTrelloItemSuccess = (draft, item) => {
  draft['list'] = [...draft.list, item];
  draft['loading'] = false;
};

const deleteTrelloItemSuccess = (draft, trelloNo) => {
  draft['list'] = draft.list.filter((el) => el.trelloNo !== trelloNo);
  draft['loading'] = false;
};

const dragTrello = (draft, { item, sourceIndex, destIndex }) => {
  const updateList = [...draft.list];

  updateList.splice(sourceIndex, 1);
  updateList.splice(destIndex, 0, item);

  draft['list'] = updateList;
};

const setTitle = (draft, { trelloNo, title }) => {
  const trello = draft.list.find((trello) => trello.trelloNo === trelloNo);
  trello['title'] = title;
};

export const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    // prettier-ignore
    switch (action.type) {
      case type.SET_TRELLO_SEARCH_TEXT: draft['searchText'] = action.searchText; break;
      case type.SET_TRELLO_ITEM_TITLE: setTitle(draft, action.payload); break;
      case type.INIT_TRELLO_LIST: draft['list'] = []; break;
      case type.GET_TRELLO_LIST_SUCCESS: draft['list'] = action.list; break;
      case type.CREATE_TRELLO_ITEM_START: draft['loading'] = true; break;
      case type.CREATE_TRELLO_ITEM_SUCCESS: createTrelloItemSuccess(draft, action.item); break;
      case type.DELETE_TRELLO_ITEM_START: draft['loading'] = true; break;
      case type.DELETE_TRELLO_ITEM_SUCCESS: deleteTrelloItemSuccess(draft, action.trelloNo); break;
      case type.DRAG_TRELLO_ITEM_END: return dragTrello(draft, action.payload);
      default: draft = state; break;
    }
  });
};
