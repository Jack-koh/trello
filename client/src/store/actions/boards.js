export const createBoardStart = payload => {
  return {
    type: 'CREATE_BOARD_START',
    board: payload
  }
}

export const createBoardSuccess = payload => {
  return {
    type: 'CREATE_BOARD_SUCCESS',
    board: payload,
  }
}