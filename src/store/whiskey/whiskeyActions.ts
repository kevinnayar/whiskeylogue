import firebase from '../../config/firebase';
import { TypeWhiskeyHydrated } from '../../types/baseTypes';
import {
  WHISKEY_GET_FAVORITE_REQUESTED,
  WHISKEY_GET_FAVORITE_SUCCEEDED,
  WHISKEY_GET_FAVORITE_FAILED,
  TypeWhiskeyGetFavoriteDispatch,
} from '../../types/reducerWhiskeyTypes';


async function handleGetFavoriteWhiskeyAsync(type: string): Promise<void | firebase.firestore.DocumentData> {
  const itemRef: firebase.firestore.Query<firebase.firestore.DocumentData> = firebase
    .firestore()
    .collection('whiskies')
    .where('type', '==', type)
    .orderBy('averageRating', 'desc')
    .limit(1);

  const doc: firebase.firestore.DocumentData = await itemRef
    .get()
    .then((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
      const item = snapshot.docs[0];
      if (item && item.exists) {
        return item.data();
      } else {
        throw new Error('Could not find whiskey.');
      }
    });
  return doc;
}

export function getFavoriteWhiskey(type: string) {
  return async (dispatch: (action: TypeWhiskeyGetFavoriteDispatch) => void) => {
    dispatch({
      type: WHISKEY_GET_FAVORITE_REQUESTED,
    });

    try {
      const result = await handleGetFavoriteWhiskeyAsync(type);
      dispatch({
        type: WHISKEY_GET_FAVORITE_SUCCEEDED,
        result,
      });
    } catch (error) {
      dispatch({
        type: WHISKEY_GET_FAVORITE_FAILED,
        error,
      });
    }
  }
}
