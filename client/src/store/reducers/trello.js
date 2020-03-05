import { updateObject } from 'shared/utility'
import * as types from 'store/types'

const initialState = {
  list: [],
  loading: false
}

const loading = state => {
  return updateObject(state, { loading: true })
}

const initTrelloList = state => {
  return updateObject(state, { list: [] })
}

const getTrelloListSuccess = (state, list) => {
  return updateObject(state, {
    list
  })
}

const createTrelloItemSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item],
    loading: false
  })
}

const deleteTrelloItemSuccess = (state, _id) => {
  return updateObject(state, {
    list: state.list.filter(el => el._id !== _id),
    loading: false
  })
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INIT_TRELLO_LIST:
      return initTrelloList(state, action.list)
    case types.GET_TRELLO_LIST_SUCCESS:
      return getTrelloListSuccess(state, action.list)
    case types.CREATE_TRELLO_ITEM_START:
      return loading(state)
    case types.CREATE_TRELLO_ITEM_SUCCESS:
      return createTrelloItemSuccess(state, action.item)
    case types.DELETE_TRELLO_ITEM_START:
      return loading(state)
    case types.DELETE_TRELLO_ITEM_SUCCESS:
      return deleteTrelloItemSuccess(state, action._id)
    default:
      return state
  }
}
