import { updateObject } from 'shared/utility'
import * as type from 'store/types'

const initialState = {
  Progress: false
}

const loadingStart = state => {
  return updateObject(state, { Progress: true })
}

const loadingFinished = state => {
  return updateObject(state, { Progress: false })
}

export const reducer = (state = initialState, act) => {
  switch (act.type) {
    case type.LOADING_START:
      return loadingStart()
    case type.LOADING_FINISHED:
      return loadingFinished()
    default:
      return state
  }
}
