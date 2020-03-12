import * as type from 'store/types'

export const createCardStart = payload => {
  const { trelloId, title } = payload
  return {
    type: type.CREATE_CARD_START,
    payload: {
      trelloId,
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
