import * as types from 'store/types'

export const getBoardsStart = () => {
  const userData = JSON.parse(localStorage.getItem('user-data'))
  if (userData) {
    return {
      type: types.GET_BOARDS_START,
      userNo: userData.userNo
    }
  }
  return {}
}

export const getBoardsSuccess = payload => {
  return {
    type: types.GET_BOARDS_SUCCESS,
    items: payload
  }
}

export const createBoardStart = payload => {
  return {
    type: types.CREATE_BOARD_START,
    payload
  }
}

export const createBoardSuccess = payload => {
  return {
    type: types.CREATE_BOARD_SUCCESS,
    item: payload
  }
}
