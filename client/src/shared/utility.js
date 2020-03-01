export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const utilSetVisible = (e, state, setState) => {
  if (state) setState(!state)
}
