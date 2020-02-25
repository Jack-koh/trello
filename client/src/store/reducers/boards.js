import * as type from 'store/actions/types';
import { updateObject } from 'shared/utility';

const initialState = {
  createLoading: false,
  getLoading: false,
  list: []
};

const loadingStart = (state, loading) => {
  return updateObject(state, { [loading]: true });
};

const getBoardsSuccess = (state, list) => {
  return updateObject(state, { list, getLoading: false });
};

const createBoardSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    createLoading: false
  });
};

const setInitBoards = state => {
  return updateObject(state, { list: [] });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_BOARDS_START:
      return loadingStart(state, 'getLoading');
    case type.GET_BOARDS_SUCCESS:
      return getBoardsSuccess(state, action.items);
    case type.GET_BOARDS_FAIL:
      return setInitBoards(state);
    case type.CREATE_BOARD_START:
      return loadingStart(state, 'createLoading');
    case type.CREATE_BOARD_SUCCESS:
      return createBoardSuccess(state, action.item);
    default:
      return state;
  }
};

export default reducer;
