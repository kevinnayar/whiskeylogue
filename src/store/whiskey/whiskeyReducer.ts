import {
  apiXferInit,
  apiXferRequested,
  apiXferSucceeded,
  apiXferFailed,
} from '../../utils/reduxUtils';
import {
  WHISKEY_GET_FAVORITE_REQUESTED,
  WHISKEY_GET_FAVORITE_SUCCEEDED,
  WHISKEY_GET_FAVORITE_FAILED,
  WHISKEY_GET_ALL_REQUESTED,
  WHISKEY_GET_ALL_SUCCEEDED,
  WHISKEY_GET_ALL_FAILED,
  WHISKEY_GET_SELECTED_REQUESTED,
  WHISKEY_GET_SELECTED_SUCCEEDED,
  WHISKEY_GET_SELECTED_FAILED,
  TypeWhiskeyFavorites,
  TypeWhiskeyReducer,
  TypeWhiskeyDispatch,
} from '../../types/reducerWhiskeyTypes';

const initialWhiskeyFavorites: TypeWhiskeyFavorites = {
  bourbon: null,
  irish: null,
  rye: null,
  scotch: null,
  japanese: null,
  whiskey: null,
};

const initialState: TypeWhiskeyReducer = {
  getFavoriteWhiskeyXferStatus: apiXferInit(),
  whiskeyFavorites: initialWhiskeyFavorites,
  getAllWhiskiesXferStatus: apiXferInit(),
  whiskiesAll: [],
  getSelectedWhiskeyXferStatus: apiXferInit(),
  whiskeySelected: null,
};

export default function whiskeyReducer(
  state: TypeWhiskeyReducer = initialState,
  action: TypeWhiskeyDispatch
): TypeWhiskeyReducer {
  switch (action.type) {
    case WHISKEY_GET_FAVORITE_REQUESTED: return {  ...state, getFavoriteWhiskeyXferStatus: apiXferRequested() };
    case WHISKEY_GET_FAVORITE_SUCCEEDED: {
      const keys: string[] = Object.keys(initialWhiskeyFavorites);
      const key: string = action.result.type.toLowerCase();
      
      if (keys.includes(key)) {
        return {
          ...state,
          getFavoriteWhiskeyXferStatus: apiXferSucceeded(),
          whiskeyFavorites: {
            ...state.whiskeyFavorites,
            [key]: action.result,
          },
        };
      } else {
        return {
          ...state,
          getFavoriteWhiskeyXferStatus: apiXferFailed(`Could not find favorite for this whiskey type: ${key}.`),
        };
      }
    }
    case WHISKEY_GET_FAVORITE_FAILED: return { ...state, getFavoriteWhiskeyXferStatus: apiXferFailed(action.error) };

    case WHISKEY_GET_ALL_REQUESTED: return { ...state, getAllWhiskiesXferStatus: apiXferRequested() }
    case WHISKEY_GET_ALL_SUCCEEDED: {
      return {
        ...state,
        getAllWhiskiesXferStatus: apiXferSucceeded(),
        whiskiesAll: action.result,
      };
    }
    case WHISKEY_GET_ALL_FAILED: return { ...state, getAllWhiskiesXferStatus: apiXferFailed(action.error) }

    case WHISKEY_GET_SELECTED_REQUESTED: return { ...state, getSelectedWhiskeyXferStatus: apiXferRequested() }
    case WHISKEY_GET_SELECTED_SUCCEEDED: {
      return {
        ...state,
        getSelectedWhiskeyXferStatus: apiXferSucceeded(),
        whiskeySelected: action.result,
      };
    }
    case WHISKEY_GET_SELECTED_FAILED: return { ...state, getSelectedWhiskeyXferStatus: apiXferFailed(action.error) }

    default:
      return state;
  }
};