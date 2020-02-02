export const setDialog = payload => {
  return {
    type: 'SET_DIALOG',
    name: payload
  }
}

export const closeDialog = () => {
  return {
    type: 'CLOSE_DIALOG'
  }
}