import * as type from 'store/types'
import { updateObject } from 'shared/utility'

const initialState = {
  createLoading: false,
  list: []
}

const initBoardList = state => {
  return updateObject(state, { list: [] })
}

const loadingStart = state => {
  return updateObject(state, { createLoading: true })
}

const getBoardListSuccess = (state, list) => {
  return updateObject(state, { list })
}

const createBoardItemSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    createLoading: false
  })
}

export const reducer = (state = initialState, act) => {
  switch (act.type) {
    case type.INIT_BOARD_LIST:
      return initBoardList()
    case type.GET_BOARD_LIST_SUCCESS:
      return getBoardListSuccess(state, act.list)
    case type.CREATE_BOARD_ITEM_START:
      return loadingStart(state)
    case type.CREATE_BOARD_ITEM_SUCCESS:
      return createBoardItemSuccess(state, act.item)
    default:
      return state
  }
}
