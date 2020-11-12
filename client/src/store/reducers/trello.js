import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  list: [],
  loading: false,
};

const loading = (draft) => {
  draft['loading'] = true;
};

const initTrelloList = (draft) => {
  draft['list'] = [];
};

const getTrelloListSuccess = (draft, list) => {
  draft['list'] = list;
};

const createTrelloItemSuccess = (draft, item) => {
  draft['list'] = [...draft.list, item];
  draft['loading'] = false;
};

const deleteTrelloItemSuccess = (draft, _id) => {
  draft['list'] = draft['list'].filter((el) => el._id !== _id);
  draft['loading'] = false;
};

const createCardSuccess = (draft, item) => {
  const updateList = [...draft.list];
  const index = updateList.findIndex((el) => el._id === item.trelloId);
  updateList[index].cardList = [...updateList[index].cardList, item];

  draft['list'] = updateList;
};

const updateCardItem = (draft, { destination, source }) => {
  const updateList = [...draft.list];

  const startTrello = updateList.find((el) => el._id === source.droppableId);
  const cardItem = startTrello.cardList[source.index];
  startTrello.cardList.splice(source.index, 1);

  const endTrello = updateList.find((el) => el._id === destination.droppableId);
  endTrello.cardList.splice(destination.index, 0, cardItem);

  draft['list'] = updateList;
};

export const reducer = (state = initialState, act) => {
  return produce(state, (draft) => {
    // prettier-ignore
    switch (act.type) {
      case [type.INIT_TRELLO_LIST]: return initTrelloList(draft, act.list);
      case [type.GET_TRELLO_LIST_SUCCESS]: return getTrelloListSuccess(draft, act.list);
      case [type.CREATE_TRELLO_ITEM_START]: return loading(draft);
      case [type.CREATE_TRELLO_ITEM_SUCCESS]: return createTrelloItemSuccess(draft, act.item);
      case [type.DELETE_TRELLO_ITEM_START]: return loading(draft);
      case [type.DELETE_TRELLO_ITEM_SUCCESS]: return deleteTrelloItemSuccess(draft, act._id);
      case [type.CREATE_CARD_SUCCESS]: return createCardSuccess(draft, act.item);
      case [type.UPDATE_CARD_ITEM]: return updateCardItem(draft, act.payload);
      default: return draft;
    }
  });
};
