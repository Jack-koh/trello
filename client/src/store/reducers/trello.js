import { updateObject } from 'shared/utility'
import * as types from 'store/types'

const initialState = {
  list: [],
  loading: false
}

const initTrelloList = state => {
  return updateObject(state, { list: [] })
}

const getTrelloListSuccess = (state, list) => {
  return updateObject(state, {
    list
  })
}

const createTrelloItemStart = state => {
  return updateObject(state, { loading: true })
}

const createTrelloItemSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    loading: false
  })
}

const updateTrelloItemSuccess = (state, item) => {}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_TRELLO_LIST:
      return initTrelloList(state, action.list)
    case types.GET_TRELLO_LIST_SUCCESS:
      return getTrelloListSuccess(state, action.list)
    case types.CREATE_TRELLO_ITEM_START:
      return createTrelloItemStart(state)
    case types.CREATE_TRELLO_ITEM_SUCCESS:
      return createTrelloItemSuccess(state, action.item)
    case types.UPDATE_TRELLO_ITEM_SUCCESS:
      return updateTrelloItemSuccess(state, action.item)
    default:
      return state
  }
}
