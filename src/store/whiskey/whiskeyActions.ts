import firebase from '../../config/firebase';
import {
  WHISKEY_GET_FAVORITE_REQUESTED,
  WHISKEY_GET_FAVORITE_SUCCEEDED,
  WHISKEY_GET_FAVORITE_FAILED,
  WHISKEY_GET_ALL_REQUESTED,
  WHISKEY_GET_ALL_SUCCEEDED,
  WHISKEY_GET_ALL_FAILED,
  TypeWhiskeyGetFavoriteDispatch,
  TypeWhiskeyGetAllDispatch,
} from '../../types/reducerWhiskeyTypes';
import {
  TypeSorters,
  TypeSortersDirection,
  TypeFilters,
} from '../../types/baseTypes';

async function handleGetWhiskeysAsync(
  sortBy?: TypeSorters,
  sortDir?: TypeSortersDirection,
  types?: TypeFilters[],
  limit?: number
): Promise<firebase.firestore.DocumentData[]> {
  let itemRef: firebase.firestore.Query<firebase.firestore.DocumentData>;

  const _sortBy = sortBy || 'averageRating';
  const _sortDir = sortDir || 'desc';

  if (types && types.length !== 0) {
    itemRef = firebase
      .firestore()
      .collection('whiskies')
      .where('type', 'in', types)
      .orderBy(_sortBy, _sortDir);
  } else {
    itemRef = firebase
      .firestore()
      .collection('whiskies')
      .orderBy(_sortBy, _sortDir);
  }

  if (limit) {
    itemRef = itemRef.limit(limit);
  }

  const docs: firebase.firestore.DocumentData[] = [];
  await itemRef
    .get()
    .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      snapshot.docs.forEach(doc => {
        if (doc.exists) {
          docs.push(doc.data());
        }
      });
    })
    .catch(_err => {
      throw new Error('Could not load whiskies.');
    });
  return docs;
}

export function getFavoriteWhiskey(type: TypeFilters) {
  return async (dispatch: (action: TypeWhiskeyGetFavoriteDispatch) => void) => {
    dispatch({
      type: WHISKEY_GET_FAVORITE_REQUESTED,
    });

    try {
      const results = await handleGetWhiskeysAsync(undefined, undefined, [type], 1);
      dispatch({
        type: WHISKEY_GET_FAVORITE_SUCCEEDED,
        result: results[0],
      });
    } catch (error) {
      dispatch({
        type: WHISKEY_GET_FAVORITE_FAILED,
        error,
      });
    }
  }
}

export function getAllWhiskies(
  sortBy: TypeSorters,
  sortDir: TypeSortersDirection,
  types?: TypeFilters[],
  limit?: number,
) {
  return async (dispatch: (action: TypeWhiskeyGetAllDispatch) => void) => {
    dispatch({
      type: WHISKEY_GET_ALL_REQUESTED,
    });

    try {
      const result = await handleGetWhiskeysAsync(sortBy, sortDir, types, limit);
      dispatch({
        type: WHISKEY_GET_ALL_SUCCEEDED,
        result,
      });
    } catch (error) {
      dispatch({
        type: WHISKEY_GET_ALL_FAILED,
        error,
      });
    }
  }
}