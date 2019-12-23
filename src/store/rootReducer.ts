import { combineReducers, Reducer } from 'redux';

import authReducer from './auth/authReducer';
import whiskeyReducer from './whiskey/whiskeyReducer';
import { TypeAuthReducer } from '../types/reducerAuthTypes';
import { TypeWhiskeyReducer } from '../types/reducerWhiskeyTypes';

import { TypeAppState, TypeAppDispatch } from '../types/baseTypes';
import { AUTH_LOGOUT_SUCCEEDED } from '../types/reducerAuthTypes';

const appReducer: Reducer<{
  auth: TypeAuthReducer;
  whiskey: TypeWhiskeyReducer;
}, TypeAppDispatch> = combineReducers({
  auth: authReducer,
  whiskey: whiskeyReducer,
});

function rootReducer(state: TypeAppState, action: TypeAppDispatch) {
  if (action.type === AUTH_LOGOUT_SUCCEEDED) {
    // @ts-ignore: clear out all state except 'auth'; not typed
    state = { auth: state.auth };
  }

  return appReducer(state, action);
};

export default rootReducer;

