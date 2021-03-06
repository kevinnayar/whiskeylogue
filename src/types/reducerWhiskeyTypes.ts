import { TypeApiXferStatus, TypeWhiskeyHydrated, TypeBaseDispatch } from './baseTypes';

export const WHISKEY_GET_FAVORITE_REQUESTED = 'WHISKEY_GET_FAVORITE_REQUESTED';
export const WHISKEY_GET_FAVORITE_SUCCEEDED = 'WHISKEY_GET_FAVORITE_SUCCEEDED';
export const WHISKEY_GET_FAVORITE_FAILED = 'WHISKEY_GET_FAVORITE_FAILED';

export const WHISKEY_GET_ALL_REQUESTED = 'WHISKEY_GET_ALL_REQUESTED';
export const WHISKEY_GET_ALL_SUCCEEDED = 'WHISKEY_GET_ALL_SUCCEEDED';
export const WHISKEY_GET_ALL_FAILED = 'WHISKEY_GET_ALL_FAILED';

export const WHISKEY_GET_SELECTED_REQUESTED = 'WHISKEY_GET_SELECTED_REQUESTED';
export const WHISKEY_GET_SELECTED_SUCCEEDED = 'WHISKEY_GET_SELECTED_SUCCEEDED';
export const WHISKEY_GET_SELECTED_FAILED = 'WHISKEY_GET_SELECTED_FAILED';

interface IWhiskeyGetFavoriteKeys {
  WHISKEY_GET_FAVORITE_REQUESTED: 'WHISKEY_GET_FAVORITE_REQUESTED';
  WHISKEY_GET_FAVORITE_SUCCEEDED: 'WHISKEY_GET_FAVORITE_SUCCEEDED';
  WHISKEY_GET_FAVORITE_FAILED: 'WHISKEY_GET_FAVORITE_FAILED';
};

interface IWhiskeyGetAllKeys {
  WHISKEY_GET_ALL_REQUESTED: 'WHISKEY_GET_ALL_REQUESTED',
  WHISKEY_GET_ALL_SUCCEEDED: 'WHISKEY_GET_ALL_SUCCEEDED',
  WHISKEY_GET_ALL_FAILED: 'WHISKEY_GET_ALL_FAILED',
};

interface IWhiskeyGetSelectedKeys {
  WHISKEY_GET_SELECTED_REQUESTED: 'WHISKEY_GET_SELECTED_REQUESTED',
  WHISKEY_GET_SELECTED_SUCCEEDED: 'WHISKEY_GET_SELECTED_SUCCEEDED',
  WHISKEY_GET_SELECTED_FAILED: 'WHISKEY_GET_SELECTED_FAILED',
};

export type TypeWhiskeyGetFavoriteDispatch = TypeBaseDispatch & {
  type: keyof IWhiskeyGetFavoriteKeys;
};

export type TypeWhiskeyGetAllDispatch = TypeBaseDispatch & {
  type: keyof IWhiskeyGetAllKeys;
};

export type TypeWhiskeyGetSelectedDispatch = TypeBaseDispatch & {
  type: keyof IWhiskeyGetSelectedKeys;
};

export type TypeWhiskeyDispatch =
  | TypeWhiskeyGetFavoriteDispatch
  | TypeWhiskeyGetAllDispatch
  | TypeWhiskeyGetSelectedDispatch;

export type TypeWhiskeyFavorites = {
  bourbon: null | TypeWhiskeyHydrated;
  irish: null | TypeWhiskeyHydrated;
  rye: null | TypeWhiskeyHydrated;
  scotch: null | TypeWhiskeyHydrated;
  japanese: null | TypeWhiskeyHydrated;
  whiskey: null | TypeWhiskeyHydrated;
};

export type TypeWhiskeyReducer = {
  getFavoriteWhiskeyXferStatus: TypeApiXferStatus;
  whiskeyFavorites: TypeWhiskeyFavorites;
  getAllWhiskiesXferStatus: TypeApiXferStatus;
  whiskiesAll: TypeWhiskeyHydrated[];
  getSelectedWhiskeyXferStatus: TypeApiXferStatus;
  whiskeySelected: null | TypeWhiskeyHydrated;
};
