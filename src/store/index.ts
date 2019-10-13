import { createStore, applyMiddleware } from 'redux'
import reduxThunk, { ThunkMiddleware } from 'redux-thunk'
import rootReducer from './reducer/index'
import { PersonState, personGetInfoAction } from './type'

interface OtherState {}

interface OtherAction {}

type State = PersonState & OtherState
type Actions = personGetInfoAction & OtherAction

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk as ThunkMiddleware<State, Actions>)
)
export default store
