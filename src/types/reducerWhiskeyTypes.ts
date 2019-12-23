import { TypeApiXferStatus, TypeWhiskeyHydrated } from './baseTypes';
import { TypeBaseDispatch } from './baseTypes';

export const WHISKEY_GET_FAVORITE_REQUESTED = 'WHISKEY_GET_FAVORITE_REQUESTED';
export const WHISKEY_GET_FAVORITE_SUCCEEDED = 'WHISKEY_GET_FAVORITE_SUCCEEDED';
export const WHISKEY_GET_FAVORITE_FAILED = 'WHISKEY_GET_FAVORITE_FAILED';

interface IWhiskeyGetFavoriteKeys {
  WHISKEY_GET_FAVORITE_REQUESTED: 'WHISKEY_GET_FAVORITE_REQUESTED';
  WHISKEY_GET_FAVORITE_SUCCEEDED: 'WHISKEY_GET_FAVORITE_SUCCEEDED';
  WHISKEY_GET_FAVORITE_FAILED: 'WHISKEY_GET_FAVORITE_FAILED';
}

export type TypeWhiskeyGetFavoriteDispatch = TypeBaseDispatch & {
  type: keyof IWhiskeyGetFavoriteKeys;
};

export type TypeWhiskeyDispatch =
  | TypeWhiskeyGetFavoriteDispatch;

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
};
