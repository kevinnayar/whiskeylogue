import { TypeAuthReducer, TypeAuthDispatch } from './reducerAuthTypes';
import { TypeWhiskeyReducer, TypeWhiskeyDispatch } from './reducerWhiskeyTypes';

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

// whiskey
export type TypeWhiskeyBase = {
  brand: string;
  name: string;
  type: string;

  age?: number;
  price?: number;
  origin?: string;
  imageUrl?: string;
};

export type TypeWhiskeyHydrated = TypeWhiskeyBase & {
  averageRating: number;
  whiskyId: string;
  createdAt: firebase.firestore.Timestamp;
};

// filters
export type TypeSorter = 'age' | 'averageRating' | 'price';
export type TypeSorterDirection = 'asc' | 'desc';
export type TypeFilter = 'Bourbon' | 'Irish' | 'Japanese' | 'Rye' | 'Scotch' | 'Whiskey';

// reducer
export type TypeBaseDispatch = {
  result?: any;
  error?: any;
};

export type TypeAppState = {
  auth: TypeAuthReducer;
  whiskey: TypeWhiskeyReducer;
};

export type TypeAppDispatch = 
  | TypeAuthDispatch
  | TypeWhiskeyDispatch
;