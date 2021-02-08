import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const login = createAsyncThunk('auth/login', async (user) => {
  const response = await axios.post('auth/login', user);
  return response.data;
});

const initialState = {
  loading: false,
  errorMessage: '',
};

const removeAuth = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user-data');
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => removeAuth(),
    resetError: (state) => {
      state['errorMessage'] = '';
    },
    authCheck: (state) => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user-data'));
      if (!token) {
        removeAuth();
      } else {
        const now = new Date().getTime() / 1000;
        if (now >= user.expiration) {
          removeAuth();
        } else {
          state['loading'] = false;
        }
      }
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state['loading'] = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      const { errorMessage, token, userId, expiration, email, name, userNo } = payload;
      if (errorMessage) {
        state['errorMessage'] = errorMessage;
      } else {
        localStorage.setItem('token', token);
        localStorage.setItem(
          'user-data',
          JSON.stringify({ userId, expiration, email, name, userNo })
        );
      }
      state['loading'] = false;
    },
  },
});

export const authActions = { ...authSlice.actions, login };
