import * as type from 'store/types'
import { updateObject } from 'shared/utility'

const initialState = {
  loading: false
}

const createCardSuccess = (state, item) => {
  return updateObject(state, {
    list: [...state.list, item]
  })
}

const reducer = (state = initialState, act) => {
  switch (act.type) {
    case type.CREATE_CARD_SUCCESS:
      return createCardSuccess(act.item)
    default:
      return state
  }
}

export default reducer
