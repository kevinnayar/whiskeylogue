import firebase from '../../config/firebase';
import { TypeUserCredentials, TypeNewUser, TypeUserHydrated } from '../../types/baseTypes';
import {
  AUTH_LOGIN_REQUESTED,
  AUTH_LOGIN_SUCCEEDED,
  AUTH_LOGIN_FAILED,
  AUTH_SIGNUP_REQUESTED,
  AUTH_SIGNUP_SUCCEEDED,
  AUTH_SIGNUP_FAILED,
  AUTH_LOGOUT_REQUESTED,
  AUTH_LOGOUT_SUCCEEDED,
  AUTH_LOGOUT_FAILED,
  AUTH_VERIFY_REQUESTED,
  AUTH_VERIFY_SUCCEEDED,
  AUTH_VERIFY_FAILED,
  AUTH_GET_USER_REQUESTED,
  AUTH_GET_USER_SUCCEEDED,
  AUTH_GET_USER_FAILED,
  TypeAuthLogInDispatch,
  TypeAuthSignUpDispatch,
  TypeAuthLogOutDispatch,
  TypeAuthVerifyDispatch,
  TypeAuthGetUserDispatch,
} from '../../types/reducerAuthTypes';

async function handleLogInAsync(userCredentials: TypeUserCredentials): Promise<firebase.auth.UserCredential> {
  const { email, password } = userCredentials;
  const credential: firebase.auth.UserCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
  return credential;
}

async function handleLogOutAsync(): Promise<void> {
  const result: void = await firebase.auth().signOut();
  return result;
}

async function handleSignUpAsync(newUser: TypeNewUser): Promise<firebase.auth.UserCredential> {
  const { firstName, lastName, displayName, email, password } = newUser;
  const credential: firebase.auth.UserCredential = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential: firebase.auth.UserCredential) => {
      const userId: string = userCredential.user ? userCredential.user.uid : `USER_UID_ERROR_${new Date().getTime()}`;
      const userInfo: TypeUserHydrated = {
        firstName,
        lastName,
        displayName,
        email: email.toLowerCase(),
        userId,
        roleType: 'BASIC',
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
      };

      firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .set(userInfo);

      return userCredential;
    });
  return credential;
}

async function handleGetUserAsync(userGuid: string): Promise<firebase.firestore.DocumentData | void> {
  const userRef: firebase.firestore.DocumentReference = firebase
    .firestore()
    .collection('users')
    .doc(userGuid);

  const userDoc: firebase.firestore.DocumentData | void = await userRef.get().then((userSnapshot: firebase.firestore.DocumentSnapshot) => {
    return userSnapshot.data();
  });
  return userDoc;
}

export function logIn(userCredentials: TypeUserCredentials) {
  return async (dispatch: (action: TypeAuthLogInDispatch) => void) => {
    dispatch({
      type: AUTH_LOGIN_REQUESTED,
    });

    try {
      const userCredential: firebase.auth.UserCredential = await handleLogInAsync(userCredentials);
      dispatch({
        type: AUTH_LOGIN_SUCCEEDED,
        result: userCredential.user || null,
      });
    } catch (error) {
      dispatch({
        type: AUTH_LOGIN_FAILED,
        error,
      });
    }
  }
}

export function signUp(newUser: TypeNewUser) {
  return async (dispatch: (action: TypeAuthLogInDispatch | TypeAuthSignUpDispatch) => void) => {
    dispatch({
      type: AUTH_SIGNUP_REQUESTED,
    });

    try {
      const userCredential: firebase.auth.UserCredential = await handleSignUpAsync(newUser);
      dispatch({
        type: AUTH_SIGNUP_SUCCEEDED,
        result: userCredential.user || null,
      });
    } catch (error) {
      dispatch({
        type: AUTH_SIGNUP_FAILED,
        error,
      });
    }

    dispatch({
      type: AUTH_LOGIN_REQUESTED,
    });

    try {
      const userCredential: firebase.auth.UserCredential = await handleLogInAsync(newUser);
      dispatch({
        type: AUTH_LOGIN_SUCCEEDED,
        result: userCredential.user || null,
      });
    } catch (error) {
      dispatch({
        type: AUTH_LOGIN_FAILED,
        error,
      });
    }
  }
}

export function verifyAuth() {
  return async (dispatch: (action: TypeAuthVerifyDispatch) => void, _getState: any, { firebase }: any) => {
    dispatch({
      type: AUTH_VERIFY_REQUESTED,
    });
  
    try {
      firebase
        .auth()
        .onAuthStateChanged((user: firebase.User) => {
          if (user !== null) {
            dispatch({
              type: AUTH_VERIFY_SUCCEEDED,
              result: user,
            });
          } else {
            dispatch({
              type: AUTH_VERIFY_FAILED,
              error: 'User is not logged in',
            });
          }
        });
    } catch (error) {
      dispatch({
        type: AUTH_VERIFY_FAILED,
        error,
      });
    }
  }
};

export function logOut() {
  return async (dispatch: (action: TypeAuthLogOutDispatch) => void) => {
    dispatch({
      type: AUTH_LOGOUT_REQUESTED,
    });

    try {
      await handleLogOutAsync();
      dispatch({
        type: AUTH_LOGOUT_SUCCEEDED,
      });
    } catch (error) {
      dispatch({
        type: AUTH_LOGOUT_FAILED,
        error,
      });
    }
  }
}

export function getUser(userGuid: string) {
  return async (dispatch: (action: TypeAuthGetUserDispatch) => void) => {
    dispatch({
      type: AUTH_GET_USER_REQUESTED,
    });

    try {
      const user: firebase.firestore.DocumentData | void = await handleGetUserAsync(userGuid);
      if (user) {
        dispatch({
          type: AUTH_GET_USER_SUCCEEDED,
          result: user,
        });
      } else {
        throw new Error('User does not exist');
      }
    } catch (error) {
      dispatch({
        type: AUTH_GET_USER_FAILED,
        error,
      });
    }
  };
}
