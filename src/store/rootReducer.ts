import { combineReducers, Reducer } from 'redux';

import authReducer from './auth/authReducer';
import orgReducer from './org/orgReducer';

import { TypeAuthReducer } from '../types/reducerAuthTypes';
import { TypeOrgReducer } from '../types/reducerOrgTypes';

import { TypeAppState, TypeAppDispatch } from '../types/baseTypes';
import { AUTH_LOGOUT_SUCCEEDED } from '../types/reducerAuthTypes';

const appReducer: Reducer<{
  auth: TypeAuthReducer;
  org: TypeOrgReducer;
}, TypeAppDispatch> = combineReducers({
  auth: authReducer,
  org: orgReducer,
});

function rootReducer(state: TypeAppState, action: TypeAppDispatch) {
  if (action.type === AUTH_LOGOUT_SUCCEEDED) {
    // @ts-ignore: clear out all state except 'auth'; not typed
    state = { auth: state.auth };
  }

  return appReducer(state, action);
};

export default rootReducer;

