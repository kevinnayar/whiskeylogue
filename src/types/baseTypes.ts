import { TypeAuthReducer, TypeAuthDispatch } from './reducerAuthTypes';

export type TypeApiXferStatus = {
  requested: boolean;
  succeeded: boolean;
  failed: boolean;
  error: null | string;
};

// user
export type TypeUserCredentials = {
  email: string;
  password: string;
};

export type TypeUserDef = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
};

export type TypeNewUser = TypeUserCredentials & TypeUserDef;

export type TypeUserRoleTypes = 'BASIC' | 'PREMIUM' | 'SUPER_ADMIN';

export type TypeUserHydrated = TypeUserDef & {
  userId: string;
  roleType: TypeUserRoleTypes;
  createdAt: firebase.firestore.Timestamp;
};

// whisky
export type TypeWhiskyBase = {
  brand: string;
  name: string;
  type: string;

  age?: number;
  price?: number;
  origin?: string;
  imageUrl?: string;
};

export type TypeWhiskyHydrated = TypeWhiskyBase & {
  averageRating: number;
  whiskyId: string;
  createdAt: firebase.firestore.Timestamp;
};

// reducer
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