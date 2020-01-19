import { combineReducers, Reducer } from 'redux';

import authReducer from './auth/authReducer';
import whiskeyReducer from './whiskey/whiskeyReducer';
import { TypeAuthReducer } from '../types/reducerAuthTypes';
import { TypeWhiskeyReducer } from '../types/reducerWhiskeyTypes';

import { TypeAppDispatch } from '../types/baseTypes';

const rootReducer: Reducer<{
  auth: TypeAuthReducer;
  whiskey: TypeWhiskeyReducer;
}, TypeAppDispatch> = combineReducers({
  auth: authReducer,
  whiskey: whiskeyReducer,
});

export default rootReducer;

