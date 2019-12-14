import { TypeAuthReducer, TypeAuthDispatch } from './reducerAuthTypes';
import { TypeOrgReducer, TypeOrgDispatch } from './reducerOrgTypes';

export type TypeNullOrString = null | string;

export type TypeApiXferStatus = {
  requested: boolean;
  succeeded: boolean;
  failed: boolean;
  error: TypeNullOrString;
};

export type TypeUserCredentials = {
  email: string;
  password: string;
};

export type TypeUserInfo = {
  firstName: string;
  lastName: string;
};

export type TypeNewUser = TypeUserCredentials & TypeUserInfo;

export type TypeUserRoleTypes = 'BASIC' | 'ADVANCED' | 'ADMIN' | 'SUPER_ADMIN';

export type TypeUserDef = {
  firstName: string;
  lastName: string;
  email: string;
  userGuid: string;
  orgGuid: string;
  role: TypeUserRoleTypes;
};

export type TypeOrgDef = {
  orgName: string;
  userGuids?: string[];
};

export type TypeBaseDispatch = {
  result?: any;
  error?: any;
};

export type TypeAppState = {
  auth: TypeAuthReducer;
  org: TypeOrgReducer;
};

export type TypeAppDispatch = 
  | TypeAuthDispatch
  | TypeOrgDispatch
;