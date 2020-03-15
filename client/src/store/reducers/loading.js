import { updateObject } from 'shared/utility'
import * as type from 'store/types'

const initialState = {
  progress: false
}

const loadingStart = state => {
  return updateObject(state, { progress: true })
}

const loadingFinished = state => {
  return updateObject(state, { progress: false })
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
