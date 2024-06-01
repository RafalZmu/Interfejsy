import { combineReducers } from 'redux';
import someStateReducer from './someState';

const rootReducer = combineReducers({
  someState: someStateReducer
  // Add other reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
