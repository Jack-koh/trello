import { updateObject } from 'shared/utility';
import * as type from '../actions/types';

const initialState = {
  loading: false,
  list: []
};

const loadingStart = state => {
  return updateObject(state, { loading: true });
};

const getTrelloListsSuccess = (state, list) => {
  return updateObject(state, {
    list,
    loading: false
  });
};

const createTrelloListSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_TRELLO_LIST_START:
      return loadingStart(state);
    case type.GET_TRELLO_LIST_SUCCESS:
      return getTrelloListsSuccess(state, action.list);
    case type.CREATE_TRELLO_LIST_START:
      return loadingStart(state);
    case type.CREATE_TRELLO_LIST_SUCCESS:
      return createTrelloListSuccess(state, action.item);
    default:
      return state;
  }
};

export default reducer;
