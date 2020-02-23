export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const utilSetVisible = (e, state, setState) => {
  e.stopPropagation();
  if (state) setState(!state);
};
