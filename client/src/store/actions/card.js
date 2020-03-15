import * as type from 'store/types'

export const createCardStart = payload => {
  const { _id, title } = payload
  return {
    type: type.CREATE_CARD_START,
    payload: {
      _id,
      title
    }
  }
}

export const createCardSuccess = item => {
  return {
    type: type.CREATE_CARD_START,
    item
  }
}
