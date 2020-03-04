import { updateObject } from 'shared/utility'
import * as types from 'store/types'

const initialState = {
  Progress: false
}

const loadingStart = state => {
  return updateObject(state, { Progress: true })
}

const loadingFinished = state => {
  return updateObject(state, { Progress: false })
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_START:
      return loadingStart()
    case types.LOADING_FINISHED:
      return loadingFinished()
    default:
      return state
  }
}
