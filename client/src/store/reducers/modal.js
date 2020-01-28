import { updateObject } from 'shared/utility';


const initialState = {
  name: null,
}

const setModal = (state, action) => {
  return updateObject(state, {
    name: action.name,
  })
}

const closeModal = (state, action) => {
  return updateObject(state, {
    name: null
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MODAL': return setModal(state, action);
    case 'CLOSE_MODAL': return closeModal();
    default: return state;
  }
}

export default reducer;