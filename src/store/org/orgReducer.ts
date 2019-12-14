import {
  apiXferInit,
  apiXferRequested,
  apiXferSucceeded,
  apiXferFailed,
} from '../../utils/reduxUtils';
import {
  TypeOrgReducer,
  TypeOrgDispatch,
  ORG_GET_REQUESTED,
  ORG_GET_SUCCEEDED,
  ORG_GET_FAILED,
} from '../../types/reducerOrgTypes';

const initialState: TypeOrgReducer = {
  getOrgXferStatus: apiXferInit(),
  orgDef: null,
};

export default function orgReducer(
  state: TypeOrgReducer = initialState,
  action: TypeOrgDispatch
): TypeOrgReducer {
  switch (action.type) {
    case ORG_GET_REQUESTED: return { ...state, getOrgXferStatus: apiXferRequested() };
    case ORG_GET_SUCCEEDED: {
      return {
        ...state,
        getOrgXferStatus: apiXferSucceeded(),
        orgDef: action.result,
      };
    }
    case ORG_GET_FAILED: return { 
      ...state,
      getOrgXferStatus: apiXferFailed(action.error),
      orgDef: null,
    }
    default:
      return state;
  }
};