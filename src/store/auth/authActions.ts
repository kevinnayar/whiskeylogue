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
  const result: firebase.auth.UserCredential = await firebase
    .auth()
    .signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
  return result;
}

async function handleGetUserAsync(userGuid: string): Promise<void | firebase.firestore.DocumentData> {
  const userRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData> = firebase
    .firestore()
    .collection('users')
    .doc(userGuid);

  const userDoc: void | firebase.firestore.DocumentData = await userRef
    .get()
    .then((userSnapshot: firebase.firestore.DocumentSnapshot) => {
      if (userSnapshot.exists) {
        return userSnapshot.data();
      } else {
        throw new Error('Could not get user data.');
      }
    });
  return userDoc;
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

export function logIn(userCredentials: TypeUserCredentials) {
  return async (dispatch: (action: TypeAuthLogInDispatch | TypeAuthGetUserDispatch) => void) => {
    dispatch({
      type: AUTH_LOGIN_REQUESTED,
    });

    try {
      const userCredential: firebase.auth.UserCredential = await handleLogInAsync(userCredentials);
      if (userCredential.user === null || !userCredential.user.uid) {
        throw new Error('User not found.');
      }

      dispatch({
        type: AUTH_LOGIN_SUCCEEDED,
        result: userCredential.user,
      });

      dispatch({
        type: AUTH_GET_USER_REQUESTED,
      });

      try {
        const userDoc: void | firebase.firestore.DocumentData = await handleGetUserAsync(userCredential.user.uid);
        if (!userDoc) {
          throw new Error('Could not get user data.');
        }

        dispatch({
          type: AUTH_GET_USER_SUCCEEDED,
          result: userDoc,
        });
      } catch (error) {
        dispatch({
          type: AUTH_GET_USER_FAILED,
          error,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTH_LOGIN_FAILED,
        error,
      });
    }
  };
}

export function signUp(newUser: TypeNewUser) {
  return async (dispatch: (action: TypeAuthLogInDispatch | TypeAuthSignUpDispatch | TypeAuthGetUserDispatch) => void) => {
    dispatch({
      type: AUTH_SIGNUP_REQUESTED,
    });

    try {
      const userCredential: firebase.auth.UserCredential = await handleSignUpAsync(newUser);
      if (userCredential.user === null || !userCredential.user.uid) {
        throw new Error('User not found.');
      }
      dispatch({
        type: AUTH_SIGNUP_SUCCEEDED,
        result: userCredential.user,
      });

      dispatch({
        type: AUTH_LOGIN_REQUESTED,
      });

      try {
        const userCredential: firebase.auth.UserCredential = await handleLogInAsync(newUser);
        if (userCredential.user === null || !userCredential.user.uid) {
          throw new Error('User not found.');
        }

        dispatch({
          type: AUTH_LOGIN_SUCCEEDED,
          result: userCredential.user,
        });

        dispatch({
          type: AUTH_GET_USER_REQUESTED,
        });

        try {
          const userDoc: void | firebase.firestore.DocumentData = await handleGetUserAsync(userCredential.user.uid);
          if (!userDoc) {
            throw new Error('Could not get user data.');
          }

          dispatch({
            type: AUTH_GET_USER_SUCCEEDED,
            result: userDoc,
          });
        } catch (error) {
          dispatch({
            type: AUTH_GET_USER_FAILED,
            error,
          });
        }
      } catch (error) {
        dispatch({
          type: AUTH_LOGIN_FAILED,
          error,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTH_SIGNUP_FAILED,
        error,
      });
    }
  }
}

export function verifyAuth() {
  return async (dispatch: (action: TypeAuthVerifyDispatch | TypeAuthGetUserDispatch) => void, _getState: any, { firebase }: any) => {
    dispatch({
      type: AUTH_VERIFY_REQUESTED,
    });
    
  
    try {
      firebase
        .auth()
        .onAuthStateChanged(async (user: firebase.User) => {
          if (user !== null) {
            dispatch({
              type: AUTH_VERIFY_SUCCEEDED,
              result: user,
            });

            dispatch({
              type: AUTH_GET_USER_REQUESTED,
            });

            try {
              const userDoc: void | firebase.firestore.DocumentData = await handleGetUserAsync(user.uid);
              if (!userDoc) {
                throw new Error('Could not get user data.');
              }

              dispatch({
                type: AUTH_GET_USER_SUCCEEDED,
                result: userDoc,
              });
            } catch (error) {
              dispatch({
                type: AUTH_GET_USER_FAILED,
                error,
              });
            }
          } else {
            dispatch({
              type: AUTH_VERIFY_FAILED,
              error: 'User is not logged in.',
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
