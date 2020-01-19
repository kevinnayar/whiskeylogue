import { createStore, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';
import firebase from '../config/firebase';
import rootReducer from './rootReducer';
import { verifyAuth } from './/auth/authActions';
import { TypeAppState, TypeAppDispatch } from '../types/baseTypes';


function configureStore(middleware: any[]) {
  const store: Store<TypeAppState, TypeAppDispatch> = createStore(rootReducer, compose(...middleware));
  // @ts-ignore: verifyAuth() always returns an action with 'type'
  store.dispatch(verifyAuth());
  return store;
}

const middleware = [
  applyMiddleware(thunk.withExtraArgument({ firebase })),
  ...(process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? [(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()]
    : []),
];

const store: Store<TypeAppState, TypeAppDispatch> = configureStore(middleware);

export default store;
