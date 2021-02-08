import { createSlice } from '@reduxjs/toolkit';
import { boardActions, trelloActions } from 'store/actions';

const initialState = {
  progress: false,
};

const loading = (state, boolean) => {
  state['progress'] = boolean;
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  extraReducers: {
    [boardActions.get.pending]: (state) => loading(state, true),
    [boardActions.get.fulfilled]: (state) => loading(state, false),
    [boardActions.update.pending]: (state) => loading(state, true),
    [boardActions.update.fulfilled]: (state) => loading(state, false),
    [trelloActions.get.pending]: (state) => loading(state, true),
    [trelloActions.get.fulfilled]: (state) => loading(state, false),
    [trelloActions.update.pending]: (state) => loading(state, true),
    [trelloActions.update.fulfilled]: (state) => loading(state, false),
  },
});
