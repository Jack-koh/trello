import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  list: [],
  loading: false,
  searchText: '',
};

const get = createAsyncThunk('trellos/get', async (boardNo, { getState }) => {
  const { searchText } = getState().trello;
  const response = await axios.get('trellos/get', { params: { boardNo, searchText } });
  return response.data;
});

const create = createAsyncThunk('trellos/create', async ({ boardNo, title }) => {
  const response = await axios.post('trellos/create', { boardNo, title });
  return response.data.item;
});

const update = createAsyncThunk('trellos/update', async ({ trelloNo, title }) => {
  await axios.put('trellos/update', { trelloNo, title });
});

const drag = createAsyncThunk('trellos/drag', async ({ item, sourceIndex, destIndex }) => {
  await axios.put('trellos/drag', { item, sourceIndex, destIndex });
  return { item, sourceIndex, destIndex };
});

const deleteTrello = createAsyncThunk('trellos/delete', async ({ trelloNo, boardNo }) => {
  await axios.delete('trellos/delete', { params: { trelloNo, boardNo } });
  return trelloNo;
});

export const trelloSlice = createSlice({
  name: 'trello',
  initialState,
  reducers: {
    search: (state, { payload: { searchText } }) => {
      state['searchText'] = searchText;
    },
    setTitle: (state, { payload }) => {
      const { trelloNo, title } = payload;
      const trello = state.list.find((trello) => trello.trelloNo === trelloNo);
      trello['title'] = title;
    },
    initList: (state) => {
      state['list'] = [];
      localStorage.removeItem('trello');
    },
  },
  extraReducers: {
    [get.fulfilled]: (state, { payload }) => {
      state['list'] = payload.trelloList;
    },
    [create.pending]: (state) => {
      state['loading'] = true;
    },
    [create.fulfilled]: (state, { payload }) => {
      state['list'] = [...state.list, payload];
      state['loading'] = false;
    },
    [create.pending]: (state) => {
      state['loading'] = true;
    },
    [drag.pending]: (state, { meta: { arg } }) => {
      const { item, sourceIndex, destIndex } = arg;
      const updateList = [...state.list];
      updateList.splice(sourceIndex, 1);
      updateList.splice(destIndex, 0, item);
      state['list'] = updateList;
    },
    [deleteTrello.fulfilled]: (state, { payload }) => {
      state['list'] = state.list.filter((el) => el.trelloNo !== payload);
      state['loading'] = false;
    },
  },
});

export const trelloActions = { ...trelloSlice.actions, get, create, update, drag, deleteTrello };
