import * as types from 'store/types'

export const getTrelloListStart = boardNo => {
  return {
    type: types.GET_TRELLO_LIST_START,
    boardNo
  }
}

export const getTrelloListSuccess = list => {
  return {
    type: types.GET_TRELLO_LIST_SUCCESS,
    list
  }
}

export const createTrelloItemStart = payload => {
  const { boardNo, userNo, userEmail, userName, title } = payload
  return {
    type: types.CREATE_TRELLO_ITEM_START,
    payload: { boardNo, userNo, userEmail, userName, title }
  }
}

export const createTrelloItemSuccess = item => {
  return {
    type: types.CREATE_TRELLO_ITEM_SUCCESS,
    item
  }
}

export const updateTrelloItemStart = payload => {
  return {
    type: types.UPDATE_TRELLO_ITEM_START,
    payload: {
      _id: payload._id,
      title: payload.title
    }
  }
}

export const updateTrelloItemSuccess = item => {
  return {
    type: types.UPDATE_TRELLO_ITEM_SUCCESS,
    item
  }
}

export const deleteTrelloItemStart = listId => {
  return {
    type: types.DELETE_TRELLO_ITEM_START,
    listId
  }
}

export const deleteTrelloItemSuccess = _id => {
  return {
    type: types.DELETE_TRELLO_ITEM_SUCCESS,
    _id
  }
}

export const initTrelloList = () => {
  return {
    type: types.INIT_TRELLO_LIST
  }
}
