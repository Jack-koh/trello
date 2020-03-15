import * as type from 'store/types'

export const getBoardListStart = () => {
  const userData = JSON.parse(localStorage.getItem('user-data'))
  if (userData) {
    return {
      type: type.GET_BOARD_LIST_START,
      userNo: userData.userNo
    }
  }
  return {}
}

export const getBoardListSuccess = list => {
  return {
    type: type.GET_BOARD_LIST_SUCCESS,
    list
  }
}

export const createBoardItemStart = payload => {
  const { userNo, userEmail, userName, title, background, favorite } = payload
  return {
    type: type.CREATE_BOARD_ITEM_START,
    payload: { userNo, userEmail, userName, title, background, favorite }
  }
}

export const createBoardItemSuccess = item => {
  return {
    type: type.CREATE_BOARD_ITEM_SUCCESS,
    item
  }
}

export const initBoardList = () => {
  return {
    type: type.INIT_BOARD_LIST
  }
}
