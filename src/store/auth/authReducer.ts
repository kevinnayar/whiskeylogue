import {
  apiXferInit,
  apiXferRequested,
  apiXferSucceeded,
  apiXferFailed,
} from '../../utils/reduxUtils';
import {
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_SIGNUP_REQUESTED,
  AUTH_SIGNUP_SUCCEEDED,
  AUTH_SIGNUP_FAILED,
  AUTH_VERIFY_REQUESTED,
  AUTH_VERIFY_SUCCEEDED,
  AUTH_VERIFY_FAILED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_LOGOUT_SUCCEEDED,
  AUTH_LOGOUT_FAILED,
  AUTH_GET_USER_REQUESTED,
  AUTH_GET_USER_SUCCEEDED,
  AUTH_GET_USER_FAILED,
  TypeUserAuth,
  TypeAuthReducer,
  TypeAuthDispatch,
} from '../../types/reducerAuthTypes';

const unAuthedUser: TypeUserAuth = {
  userGuid: null,
  email: null,
  authenticated: false,
};

const initialState: TypeAuthReducer = {
  logInXferStatus: apiXferInit(),
  signUpXferStatus: apiXferInit(),
  verifyAuthXferStatus: apiXferInit(),
  logOutXferStatus: apiXferInit(),
  getUserXferStatus: apiXferInit(),
  userAuth: unAuthedUser,
  userDef: null,
};

export default function authReducer(
  state: TypeAuthReducer = initialState,
  action: TypeAuthDispatch
): TypeAuthReducer {
  switch (action.type) {
    case AUTH_LOGIN_REQUESTED: return {  ...state, logInXferStatus: apiXferRequested() };
    case AUTH_LOGIN_SUCCEEDED: {
      return {
        ...state,
        logInXferStatus: apiXferSucceeded(),
        userAuth: {
          userGuid: action.result.uid,
          email: action.result.email,
          authenticated: true,
        },
      };
    }
    case AUTH_LOGIN_FAILED: return {
      ...state,
      logInXferStatus: apiXferFailed(action.error),
      userAuth: unAuthedUser,
      userDef: null,
    };

    case AUTH_VERIFY_REQUESTED: return { ...state, verifyAuthXferStatus: apiXferRequested() };
    case AUTH_VERIFY_SUCCEEDED: {
      return {
        ...state,
        verifyAuthXferStatus: apiXferSucceeded(),
        userAuth: {
          userGuid: action.result.uid,
          email: action.result.email,
          authenticated: true,
        },
      };
    }
    case AUTH_VERIFY_FAILED: {
      return {
        ...state,
        verifyAuthXferStatus: apiXferFailed(action.error),
        userAuth: unAuthedUser,
        userDef: null,
      };
    }

    case AUTH_SIGNUP_REQUESTED: return { ...state, signUpXferStatus: apiXferRequested() };
    case AUTH_SIGNUP_SUCCEEDED: return { ...state, signUpXferStatus: apiXferSucceeded() };
    case AUTH_SIGNUP_FAILED: return { ...state, signUpXferStatus: apiXferFailed(action.error) };

    case AUTH_LOGOUT_REQUESTED: return { ...state, logOutXferStatus: apiXferRequested() };
    case AUTH_LOGOUT_SUCCEEDED: {
      return {
        ...state,
        logOutXferStatus: apiXferSucceeded(),
        userAuth: unAuthedUser,
        userDef: null,
      };
    }
    case AUTH_LOGOUT_FAILED: return { ...state, logOutXferStatus: apiXferFailed(action.error) };


    case AUTH_GET_USER_REQUESTED: return { ...state, getUserXferStatus: apiXferRequested() };
    case AUTH_GET_USER_SUCCEEDED: {
      return {
        ...state,
        getUserXferStatus: apiXferSucceeded(),
        userDef: action.result,
      };
    }
    case AUTH_GET_USER_FAILED: return { 
      ...state,
      getUserXferStatus: apiXferFailed(action.error),
      userDef: null,
    }

    default:
      return state;
  }
};