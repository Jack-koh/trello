import * as type from 'store/types'

export const initCardList = () => {
  return {
    type: type.INIT_CARD_LIST
  }
}

export const getCardListStart = boardNo => {
  return {
    type: type.GET_CARD_LIST_START,
    boardNo
  }
}

export const getCardListSuccess = list => {
  return {
    type: type.GET_CARD_LIST_SUCCESS,
    list
  }
}

export const createCardStart = payload => {
  const { boardNo, trelloNo, title } = payload
  return {
    type: type.CREATE_CARD_START,
    payload: { boardNo, trelloNo, title }
  }
}

export const createCardSuccess = item => {
  return {
    type: type.CREATE_CARD_SUCCESS,
    item
  }
}
export const removeCardItem = cardItem => {
  return {
    type: type.REMOVE_CARD_ITEM,
    cardItem
  }
}
