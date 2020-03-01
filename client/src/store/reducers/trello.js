import { updateObject } from 'shared/utility'
import * as type from '../actions/types'

const initialState = {
  loading: false,
  list: []
}

const loadingStart = state => {
  return updateObject(state, { loading: true })
}

const getTrelloListSuccess = (state, list) => {
  return updateObject(state, {
    list,
    loading: false
  })
}

const createTrelloItemSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    loading: false
  })
}

const updateTrelloItemSuccess = (state, item) => {
  return
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_TRELLO_LIST_START:
      return loadingStart(state)
    case type.GET_TRELLO_LIST_SUCCESS:
      return getTrelloListSuccess(state, action.list)
    case type.CREATE_TRELLO_ITEM_START:
      return loadingStart(state)
    case type.CREATE_TRELLO_ITEM_SUCCESS:
      return createTrelloItemSuccess(state, action.item)
    case type.UPDATE_TRELLO_ITEM_START:
      return loadingStart(state)
    case type.UPDATE_TRELLO_ITEM_SUCCESS:
      return updateTrelloItemSuccess(state, action.item)
    default:
      return state
  }
}

export default reducer
