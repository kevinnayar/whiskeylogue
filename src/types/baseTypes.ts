import { TypeAuthReducer, TypeAuthDispatch } from './reducerAuthTypes';

export type TypeApiXferStatus = {
  requested: boolean;
  succeeded: boolean;
  failed: boolean;
  error: null | string;
};

export type TypeUserCredentials = {
  email: string;
  password: string;
};

export type TypeUserBase = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
};

export type TypeNewUser = TypeUserCredentials & TypeUserBase;

export type TypeUserRoleTypes = 'BASIC' | 'PREMIUM' | 'SUPER_ADMIN';

export type TypeUserHydrated = TypeUserBase & {
  userId: string;
  roleType: TypeUserRoleTypes;
  createdAt: firebase.firestore.Timestamp;
};

export type TypeBaseDispatch = {
  result?: any;
  error?: any;
};

export type TypeAppState = {
  auth: TypeAuthReducer;
};

export type TypeAppDispatch = 
  | TypeAuthDispatch
;