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

export const getBoardsSuccess = list => {
  return {
    type: types.GET_BOARDS_SUCCESS,
    list
  }
}

export const createBoardStart = payload => {
  const { userNo, userEmail, userName, title, background, favorite } = payload
  return {
    type: types.CREATE_BOARD_START,
    payload: { userNo, userEmail, userName, title, background, favorite }
  }
}

export const createBoardSuccess = item => {
  return {
    type: types.CREATE_BOARD_SUCCESS,
    item
  }
}
