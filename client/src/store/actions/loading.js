import * as types from 'store/types'

export const loadingStart = () => {
  return {
    type: types.LOADING_START
  }
}

export const loadingFinished = () => {
  return {
    type: types.LOADING_FINISHED
  }
}
