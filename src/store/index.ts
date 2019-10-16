import { createStore, applyMiddleware } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './reducer/index';
import { personAction, AllState, courseAction } from './type';

interface OtherState {}

interface OtherAction {}

type Actions = personAction & courseAction;

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk as ThunkMiddleware<AllState, Actions>)
);
export default store;
