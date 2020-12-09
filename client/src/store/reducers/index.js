import { enableES5 } from 'immer';
export { reducer as authReducer } from './auth';
export { reducer as boardReducer } from './board';
export { reducer as trelloReducer } from './trello';
export { reducer as loadingReducer } from './loading';
export { reducer as cardReducer } from './card';
enableES5();
