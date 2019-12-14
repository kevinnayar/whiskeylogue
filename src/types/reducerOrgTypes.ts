import { TypeApiXferStatus, TypeOrgDef, TypeBaseDispatch } from './baseTypes';

export const ORG_GET_REQUESTED = 'ORG_GET_REQUESTED';
export const ORG_GET_SUCCEEDED = 'ORG_GET_SUCCEEDED';
export const ORG_GET_FAILED = 'ORG_GET_FAILED';

interface IOrgGetKeys {
  ORG_GET_REQUESTED: 'ORG_GET_REQUESTED';
  ORG_GET_SUCCEEDED: 'ORG_GET_SUCCEEDED';
  ORG_GET_FAILED: 'ORG_GET_FAILED';
}

export type TypeOrgGetDispatch = TypeBaseDispatch & {
  type: keyof IOrgGetKeys;
};

export type TypeOrgDispatch = TypeOrgGetDispatch;

export type TypeOrgReducer = {
  getOrgXferStatus: TypeApiXferStatus;
  orgDef: TypeOrgDef | null;
};
