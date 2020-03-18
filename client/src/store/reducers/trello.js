import { updateObject } from 'shared/utility'
import * as type from 'store/types'

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

const createCardSuccess = (state, item) => {
  const list = [...state.list]
  const index = list.findIndex(el => el._id === item.trelloId)
  list[index].cardList = [...list[index].cardList, item]
  return updateObject(state, { list })
}

export const reducer = (state = initialState, act) => {
  switch (act.type) {
    case type.INIT_TRELLO_LIST:
      return initTrelloList(state, act.list)
    case type.GET_TRELLO_LIST_SUCCESS:
      return getTrelloListSuccess(state, act.list)
    case type.CREATE_TRELLO_ITEM_START:
      return loading(state)
    case type.CREATE_TRELLO_ITEM_SUCCESS:
      return createTrelloItemSuccess(state, act.item)
    case type.DELETE_TRELLO_ITEM_START:
      return loading(state)
    case type.DELETE_TRELLO_ITEM_SUCCESS:
      return deleteTrelloItemSuccess(state, act._id)
    case type.CREATE_CARD_SUCCESS:
      return createCardSuccess(state, act.item)
    default:
      return state
  }
}
