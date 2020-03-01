import * as type from './types'

export const getTrelloListStart = params => {
  return {
    type: type.GET_TRELLO_LIST_START,
    params
  }
}

export const getTrellosListsSuccess = payload => {
  return {
    type: type.GET_TRELLO_LIST_SUCCESS,
    list: payload
  }
}

export const createTrelloItemStart = payload => {
  return {
    type: type.CREATE_TRELLO_ITEM_START,
    payload
  }
}

export const createTrelloItemSuccess = payload => {
  return {
    type: type.CREATE_TRELLO_ITEM_SUCCESS,
    item: payload
  }
}

export const updateTrelloItemStart = payload => {
  return {
    type: type.UPDATE_TRELLO_ITEM_START,
    payload
  }
}

export const updateTrelloItemSuccess = payload => {
  return {
    type: type.UPDATE_TRELLO_ITEM_SUCCESS,
    item: payload
  }
}
