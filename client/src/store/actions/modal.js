export const setModal = payload => {
  return {
    type: 'SET_MODAL',
    name: payload
  }
}

export const closeModal = () => {
  return {
    type: 'CLOSE_MODAL'
  }
}