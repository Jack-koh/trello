import * as type from 'store/types'
import produce from 'immer'

const initialState = {
  createLoading: false,
  list: []
}

const initBoardList = draft => {
  draft['list'] = []
}

const loadingStart = draft => {
  draft['createLoading'] = true
}

const getBoardListSuccess = (draft, list) => {
  draft['list'] = list
}

const createBoardItemSuccess = (draft, item) => {
  draft['list'] = [...draft.list, item]
  draft['createLoading'] = false
}

export const reducer = (state = initialState, act) => {
  return produce(state, draft => {
    switch (act.type) {
      case type.INIT_BOARD_LIST:
        return initBoardList(draft)
      case type.GET_BOARD_LIST_SUCCESS:
        return getBoardListSuccess(draft, act.list)
      case type.CREATE_BOARD_ITEM_START:
        return loadingStart(draft)
      case type.CREATE_BOARD_ITEM_SUCCESS:
        return createBoardItemSuccess(draft, act.item)
      default:
        return draft
    }
  })
}
