import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import axios from 'axios';
import history from 'shared/history';

const initialState = {
  createLoading: false,
  deleteLoading: false,
  list: [],
  searchText: '',
};

export const get = createAsyncThunk('boards/get', async (_, { getState }) => {
  const { userNo } = JSON.parse(localStorage.getItem('user-data'));
  const { searchText } = getState().board;
  const response = await axios.get('boards/get', { params: { userNo, searchText } });
  return response.data.list;
});

export const create = createAsyncThunk('boards/create', async (payload, { dispatch }) => {
  const response = await axios.post('boards/create', payload);
  return response.data.item;
});

export const deleteBoard = createAsyncThunk('boards/delete', async (boardNo) => {
  await axios.delete('boards/delete', { params: { boardNo } });
});

export const update = createAsyncThunk('board/update', async (item) => {
  const response = await axios.put('boards/update', item);
  return response.data.item;
});

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    search: (state, { payload }) => {
      state['searchText'] = payload;
    },
    initList: (state) => {
      state['list'] = [];
    },
  },
  extraReducers: {
    [get.fulfilled]: (state, { payload }) => {
      state['list'] = payload;
    },
    [create.pending]: (state) => {
      state['createLoading'] = true;
    },
    [create.fulfilled]: (state, { payload }) => {
      const item = {
        backgroundName: payload.background_name,
        backgroundType: payload.background_type,
        boardNo: payload.board_no,
        favorite: payload.favorite,
        regDate: payload.reg_date,
        title: payload.title,
      };
      state['list'] = [...state.list, item];
      localStorage.setItem('trello', JSON.stringify(item));
      _.debounce(() => history.push(`/main/trello/${payload.title}`), 0)();
    },
    [update.fulfilled]: (state, { payload }) => {
      const item = {
        backgroundName: payload.background_name,
        backgroundType: payload.background_type,
        boardNo: payload.board_no,
        favorite: payload.favorite,
        regDate: payload.reg_date,
        title: payload.title,
      };
      const index = _.findIndex(state.list, (el) => el.boardNo === payload.board_no);
      state.list[index] = item;
      localStorage.setItem('trello', JSON.stringify(item));
    },
    [deleteBoard.pending]: (state) => {
      state['deleteLoading'] = true;
    },
    [deleteBoard.fulfilled]: (state) => {
      state['deleteLoading'] = false;
      localStorage.removeItem('trello');
      _.debounce(() => history.push('/main/board'), 0)();
    },
  },
});

export const boardActions = { ...boardSlice.actions, get, create, deleteBoard, update };
