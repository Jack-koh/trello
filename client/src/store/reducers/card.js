import * as type from 'store/actions/types';
import produce from 'immer';

const initialState = {
  list: [],
  loading: false,
};

const getCardListSuccess = (draft, list) => {
  draft['list'] = list;
  draft['loading'] = false;
};

const createCardSuccess = (draft, item) => {
  const target = draft.list.find((cards) => cards.trelloNo === item.trelloNo);
  target
    ? (target['list'] = [...target.list, item])
    : (draft['list'] = [...draft.list, { trelloNo: item.trelloNo, list: [item] }]);
  draft['loading'] = false;
};

const deleteTrelloItemSuccess = (draft, trelloNo) => {
  draft['list'] = draft.list.filter((el) => el.trelloNo !== trelloNo);
  draft['loading'] = false;
};

const dragCardEnd = (draft, { item, source, destination }) => {
  if (source.trelloNo === destination.trelloNo) {
    const target = draft.list.find((el) => el.trelloNo === item.trelloNo);
    target['list'].splice(source.index, 1);
    target['list'].splice(destination.index, 0, item);
  } else {
    const sourceTarget = draft.list.find((el) => el.trelloNo === source.trelloNo);
    const destTarget = draft.list.find((el) => el.trelloNo === destination.trelloNo);

    sourceTarget['list'].splice(source.index, 1);
    destTarget
      ? destTarget['list'].splice(destination.index, 0, { ...item, trelloNo: destination.trelloNo })
      : (draft['list'] = [...draft.list, { trelloNo: destination.trelloNo, list: [item] }]);
  }
};

const updateCard = (draft, item) => {
  const trelloIndex = draft.list.findIndex((trello) => trello.trelloNo === item.trelloNo);
  let cardIndex = draft.list[trelloIndex].list.findIndex((card) => card.cardNo === item.cardNo);
  draft.list[trelloIndex].list[cardIndex] = item;
};

export const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    // prettier-ignore
    switch (action.type) {
      case type.INIT_CARD_LIST: draft['list'] = []; break;
      case type.GET_CARD_LIST_SUCCESS: getCardListSuccess(draft, action.list); break;
      case type.CREATE_CARD_START: draft['loading'] = true; break;
      case type.CREATE_CARD_SUCCESS: createCardSuccess(draft, action.item); break;
      case type.UPDATE_CARD_START: updateCard(draft, action.item); break;
      case type.DELETE_TRELLO_ITEM_SUCCESS: return deleteTrelloItemSuccess(draft, action.trelloNo);
      case type.DRAG_CARD_END: return dragCardEnd(draft, action.payload);
      default: draft = state; break;
    }
  });
};
