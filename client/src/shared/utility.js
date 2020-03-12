export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  }
}

export const utilToggleHandler = (state, setState) => {
  if (state) setState(!state)
  return false;
}
