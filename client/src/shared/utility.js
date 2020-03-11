export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const utilSetToggle = (e, state, setState) => {
  if (state) setState(!state)
}
