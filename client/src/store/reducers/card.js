import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { trelloActions } from 'store/actions';

const initialState = {
  list: [],
  loading: false,
};

const create = createAsyncThunk('cards/create', async ({ trelloNo, title }) => {
  const response = await axios.post('cards/create', { trelloNo, title });
  return response.data.item;
});

const drag = createAsyncThunk('cards/drag', async ({ item, source, destination }) => {
  await axios.put('cards/drag', { item, source, destination });
  return { item, source, destination };
});

const update = createAsyncThunk('cards/update', async (payload) => {
  await axios.put('cards/update', payload);
  return payload;
});

const deleteCard = createAsyncThunk('cards/delete', async ({ trelloNo, cardNo }) => {
  await axios.delete('cards/delete', { params: { trelloNo, cardNo } });
  return { trelloNo, cardNo };
});

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    initList: (state) => {
      state['list'] = [];
    },
  },
  extraReducers: {
    [create.pending]: (state) => {
      state['loading'] = true;
    },
    [create.fulfilled]: (state, { payload }) => {
      const target = state.list.find((cards) => cards.trelloNo === payload.trelloNo);
      target
        ? (target['list'] = [...target.list, payload])
        : (state['list'] = [...state.list, { trelloNo: payload.trelloNo, list: [payload] }]);
      state['loading'] = false;
    },
    [update.pending]: (state, { meta: { arg } }) => {
      const trelloIndex = state.list.findIndex((trello) => trello.trelloNo === arg.trelloNo);
      let cardIndex = state.list[trelloIndex].list.findIndex((card) => card.cardNo === arg.cardNo);
      state.list[trelloIndex].list[cardIndex] = arg;
    },
    [drag.pending]: (state, { meta: { arg } }) => {
      const { item, source, destination } = arg;
      if (source.trelloNo === destination.trelloNo) {
        const target = state.list.find((el) => el.trelloNo === item.trelloNo);
        target['list'].splice(source.index, 1);
        target['list'].splice(destination.index, 0, item);
      } else {
        const sourceTarget = state.list.find((el) => el.trelloNo === source.trelloNo);
        const destTarget = state.list.find((el) => el.trelloNo === destination.trelloNo);

        if (sourceTarget.list.length > 1) {
          sourceTarget['list'].splice(source.index, 1);
        } else {
          state.list = state.list.filter((el) => el.trelloNo !== source.trelloNo);
        }

        destTarget
          ? destTarget['list'].splice(destination.index, 0, {
              ...item,
              trelloNo: destination.trelloNo,
            })
          : (state['list'] = [
              ...state.list,
              {
                trelloNo: destination.trelloNo,
                list: [{ ...item, trelloNo: destination.trelloNo }],
              },
            ]);
      }
    },
    [deleteCard.fulfilled]: (state, { payload }) => {
      const { trelloNo, cardNo } = payload;
      const item = state.list.find((el) => el.trelloNo === trelloNo);
      item.list = item.list.filter((el) => el.cardNo !== cardNo);
      state['loading'] = false;
    },
    [trelloActions.deleteTrello]: (state, { payload }) => {
      state['list'] = state.list.filter((el) => el.trelloNo !== payload);
      state['loading'] = false;
    },
    [trelloActions.get.fulfilled]: (state, { payload }) => {
      state['list'] = payload.cardList;
    },
  },
});

export const cardActions = { ...cardSlice.actions, create, drag, deleteCard, update };
