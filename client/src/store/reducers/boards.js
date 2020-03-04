import * as types from 'store/types'
import { updateObject } from 'shared/utility'

const initialState = {
  createLoading: false,
  list: []
}

const loadingStart = state => {
  return updateObject(state, { createLoading: true })
}

const getBoardsSuccess = (state, list) => {
  return updateObject(state, { list })
}

const createBoardSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    createLoading: false
  })
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BOARDS_SUCCESS:
      return getBoardsSuccess(state, action.items)
    case types.CREATE_BOARD_START:
      return loadingStart(state)
    case types.CREATE_BOARD_SUCCESS:
      return createBoardSuccess(state, action.item)
    default:
      return state
  }
}
