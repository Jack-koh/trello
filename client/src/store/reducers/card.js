import * as type from 'store/actions/types'
import produce from 'immer'

const initialState = {
  list: [],
  loading: false,
  addCard: false,
}

const loading = (draft) => {
  draft['loading'] = true
}

const initCardList = (draft) => {
  draft['list'] = []
}

const getCardListSuccess = (draft, list) => {
  draft['list'] = list
  draft['loading'] = false
}

const createCardSuccess = (draft, item) => {
  draft['list'] = [...draft.list, item]
  draft['loading'] = false
  draft['addCard'] = false
}

export const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    // prettier-ignore
    switch (action.type) {
      case type.SET_ADD_MODE: draft['addCard'] = action.active; break;
      case type.INIT_CARD_LIST: initCardList(draft); break;
      case type.GET_CARD_LIST_START: loading(draft); break;
      case type.GET_CARD_LIST_SUCCESS: getCardListSuccess(draft, action.list); break;
      case type.CREATE_CARD_START: loading(draft); break;
      case type.CREATE_CARD_SUCCESS: createCardSuccess(draft, action.item); break;
      default: draft = state; break;
    }
  })
}
