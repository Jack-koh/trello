import { updateObject } from 'shared/utility'
import * as type from 'store/types'

const initialState = {
  list: [],
  loading: false
}

const loading = state => {
  return updateObject(state, { loading: true })
}

const initCardList = state => {
  return updateObject(state, { list: [] })
}

const getCardListSuccess = (state, list) => {
  return updateObject(state, { list, loading: false })
}

const createCardSuccess = (state, item) => {
  return updateObject(state, { list: [...state.list, item], loading: false })
}

const removeCardItem = (state, cardItem) => {
  const result = state.list.filter(el => el.cardNo !== cardItem.cardNo)
  return updateObject(state, { list: result })
}

export const reducer = (state = initialState, act) => {
  switch (act.type) {
    case type.INIT_CARD_LIST:
      return initCardList(state)
    case type.GET_CARD_LIST_START:
      return loading(state)
    case type.GET_CARD_LIST_SUCCESS:
      return getCardListSuccess(state, act.list)
    case type.CREATE_CARD_START:
      return loading(state)
    case type.CREATE_CARD_SUCCESS:
      return createCardSuccess(state, act.item)
    case type.REMOVE_CARD_ITEM:
      return removeCardItem(state, act.cardItem)
    default:
      return state
  }
}