import {
  TypeApiXferStatus,
  TypeNullOrString,
  TypeUserDef,
} from './baseTypes';
import { TypeBaseDispatch } from './baseTypes';

export const AUTH_LOGIN_REQUESTED = 'AUTH_LOGIN_REQUESTED';
export const AUTH_LOGIN_SUCCEEDED = 'AUTH_LOGIN_SUCCEEDED';
export const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED';

export const AUTH_SIGNUP_REQUESTED = 'AUTH_SIGNUP_REQUESTED';
export const AUTH_SIGNUP_SUCCEEDED = 'AUTH_SIGNUP_SUCCEEDED';
export const AUTH_SIGNUP_FAILED = 'AUTH_SIGNUP_FAILED';

export const AUTH_LOGOUT_REQUESTED = 'AUTH_LOGOUT_REQUESTED';
export const AUTH_LOGOUT_SUCCEEDED = 'AUTH_LOGOUT_SUCCEEDED';
export const AUTH_LOGOUT_FAILED = 'AUTH_LOGOUT_FAILED';

export const AUTH_VERIFY_REQUESTED = 'AUTH_VERIFY_REQUESTED';
export const AUTH_VERIFY_SUCCEEDED = 'AUTH_VERIFY_SUCCEEDED';
export const AUTH_VERIFY_FAILED = 'AUTH_VERIFY_FAILED';

export const AUTH_GET_USER_REQUESTED = 'AUTH_GET_USER_REQUESTED';
export const AUTH_GET_USER_SUCCEEDED = 'AUTH_GET_USER_SUCCEEDED';
export const AUTH_GET_USER_FAILED = 'AUTH_GET_USER_FAILED';

interface IAuthLogInKeys {
  AUTH_LOGIN_REQUESTED: 'AUTH_LOGIN_REQUESTED';
  AUTH_LOGIN_SUCCEEDED: 'AUTH_LOGIN_SUCCEEDED';
  AUTH_LOGIN_FAILED: 'AUTH_LOGIN_FAILED';
}
interface IAuthSignUpKeys {
  AUTH_SIGNUP_REQUESTED: 'AUTH_SIGNUP_REQUESTED';
  AUTH_SIGNUP_SUCCEEDED: 'AUTH_SIGNUP_SUCCEEDED';
  AUTH_SIGNUP_FAILED: 'AUTH_SIGNUP_FAILED';
}
interface IAuthLogOutKeys {
  AUTH_LOGOUT_REQUESTED: 'AUTH_LOGOUT_REQUESTED';
  AUTH_LOGOUT_SUCCEEDED: 'AUTH_LOGOUT_SUCCEEDED';
  AUTH_LOGOUT_FAILED: 'AUTH_LOGOUT_FAILED';
}
interface IAuthVerifyKeys {
  AUTH_VERIFY_REQUESTED: 'AUTH_VERIFY_REQUESTED';
  AUTH_VERIFY_SUCCEEDED: 'AUTH_VERIFY_SUCCEEDED';
  AUTH_VERIFY_FAILED: 'AUTH_VERIFY_FAILED';
}
interface IAuthGetUserKeys {
  AUTH_GET_USER_REQUESTED: 'AUTH_GET_USER_REQUESTED';
  AUTH_GET_USER_SUCCEEDED: 'AUTH_GET_USER_SUCCEEDED';
  AUTH_GET_USER_FAILED: 'AUTH_GET_USER_FAILED';
}

export type TypeAuthLogInDispatch = TypeBaseDispatch & {
  type: keyof IAuthLogInKeys;
};
export type TypeAuthSignUpDispatch = TypeBaseDispatch & {
  type: keyof IAuthSignUpKeys;
};
export type TypeAuthLogOutDispatch = TypeBaseDispatch & {
  type: keyof IAuthLogOutKeys;
};
export type TypeAuthVerifyDispatch = TypeBaseDispatch & {
  type: keyof IAuthVerifyKeys;
};
export type TypeAuthGetUserDispatch = TypeBaseDispatch & {
  type: keyof IAuthGetUserKeys;
};

export type TypeAuthDispatch =
  | TypeAuthLogInDispatch
  | TypeAuthSignUpDispatch
  | TypeAuthLogOutDispatch
  | TypeAuthVerifyDispatch
  | TypeAuthGetUserDispatch;

export type TypeUserAuth = {
  userGuid: TypeNullOrString;
  email: TypeNullOrString;
  authenticated: boolean;
};

export type TypeAuthReducer = {
  logInXferStatus: TypeApiXferStatus;
  signUpXferStatus: TypeApiXferStatus;
  verifyAuthXferStatus: TypeApiXferStatus;
  logOutXferStatus: TypeApiXferStatus;
  getUserXferStatus: TypeApiXferStatus;
  userAuth: TypeUserAuth;
  userDef: null | TypeUserDef;
};