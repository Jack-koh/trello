import * as type from 'store/actions/types';

export const loadingStart = () => {
  return {
    type: type.LOADING_START,
  };
};

export const loadingFinished = () => {
  return {
    type: type.LOADING_FINISHED,
  };
};
