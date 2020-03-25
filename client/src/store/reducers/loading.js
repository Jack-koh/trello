import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  progress: false,
};

const loadingStart = (draft) => {
  draft['progress'] = true;
};

const loadingFinished = (draft) => {
  draft['progress'] = false;
};

export const reducer = (state = initialState, act) => {
  return produce(state, (draft) => {
    switch (act.type) {
      case type.LOADING_START:
        return loadingStart(draft);
      case type.LOADING_FINISHED:
        return loadingFinished(draft);
      default:
        return draft;
    }
  });
};
