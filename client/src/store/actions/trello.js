import * as types from 'store/types'

export const getTrelloListStart = params => {
  return {
    type: types.GET_TRELLO_LIST_START,
    params
  }
}

export const getTrelloListSuccess = payload => {
  return {
    type: types.GET_TRELLO_LIST_SUCCESS,
    list: payload
  }
}

export const createTrelloItemStart = payload => {
  return {
    type: types.CREATE_TRELLO_ITEM_START,
    payload
  }
}

export const createTrelloItemSuccess = payload => {
  return {
    type: types.CREATE_TRELLO_ITEM_SUCCESS,
    item: payload
  }
}

export const updateTrelloItemStart = payload => {
  return {
    type: types.UPDATE_TRELLO_ITEM_START,
    payload
  }
}

export const updateTrelloItemSuccess = payload => {
  return {
    type: types.UPDATE_TRELLO_ITEM_SUCCESS,
    item: payload
  }
}

export const initTrelloList = () => {
  return {
    type: types.INIT_TRELLO_LIST
  }
}
