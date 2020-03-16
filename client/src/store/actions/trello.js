import * as type from 'store/types'

export const getTrelloListStart = boardNo => {
  return {
    type: type.GET_TRELLO_LIST_START,
    boardNo
  }
}

export const getTrelloListSuccess = list => {
  return {
    type: type.GET_TRELLO_LIST_SUCCESS,
    list
  }
}

export const createTrelloItemStart = payload => {
  const { boardNo, userNo, title } = payload
  return {
    type: type.CREATE_TRELLO_ITEM_START,
    payload: { boardNo, userNo, title }
  }
}

export const createTrelloItemSuccess = item => {
  return {
    type: type.CREATE_TRELLO_ITEM_SUCCESS,
    item
  }
}

export const updateTrelloItemStart = payload => {
  return {
    type: type.UPDATE_TRELLO_ITEM_START,
    payload: {
      _id: payload._id,
      updateTitle: payload.updateTitle
    }
  }
}

export const updateTrelloItemSuccess = item => {
  return {
    type: type.UPDATE_TRELLO_ITEM_SUCCESS,
    item
  }
}

export const deleteTrelloItemStart = params => {
  return {
    type: type.DELETE_TRELLO_ITEM_START,
    params: {
      _id: params._id,
      confirmTitle: params.confirmTitle
    }
  }
}

export const deleteTrelloItemSuccess = _id => {
  return {
    type: type.DELETE_TRELLO_ITEM_SUCCESS,
    _id
  }
}

export const initTrelloList = () => {
  return {
    type: type.INIT_TRELLO_LIST
  }
}
