import firebase from '../../config/firebase';
import { TypeUserDef, TypeOrgDef } from '../../types/baseTypes';
import {
  TypeOrgGetDispatch,
  ORG_GET_REQUESTED,
  ORG_GET_SUCCEEDED,
  ORG_GET_FAILED,
} from '../../types/reducerOrgTypes';

async function handleGetOrgAsync(userDef: TypeUserDef): Promise<void | firebase.firestore.DocumentData> {
  const orgRef: firebase.firestore.DocumentReference = firebase
    .firestore()
    .collection('orgs')
    .doc(userDef.orgGuid);

  const orgDoc: void | firebase.firestore.DocumentData = await orgRef
    .get()
    .then((orgSnapshot: firebase.firestore.DocumentSnapshot) => {
      const data: void | firebase.firestore.DocumentData = orgSnapshot.data();
      if (!data) return undefined;

      const roleSpecificData: TypeOrgDef = userDef.role === 'ADMIN'
        ? { orgName: data.orgName, userGuids: data.userGuids }
        : { orgName: data.orgName };
      return roleSpecificData;
    });
  return orgDoc;
}

export function getOrg(userDef: TypeUserDef) {
  return async (dispatch: (action: TypeOrgGetDispatch) => void) => {
    dispatch({
      type: ORG_GET_REQUESTED,
    });

    try {
      const org: firebase.firestore.DocumentData | void = await handleGetOrgAsync(userDef);
      if (org) {
        dispatch({
          type: ORG_GET_SUCCEEDED,
          result: org,
        });
      } else {
        throw new Error('Org does not exist');
      }
    } catch (error) {
      dispatch({
        type: ORG_GET_FAILED,
        error,
      });
    }
  };
}