import { Reducer, AnyAction } from 'redux';

export interface PersonState {

}

export interface PersonAction extends AnyAction { }

let init_state: PersonState = {}

const person: Reducer<PersonState | undefined, PersonAction> = (state = init_state, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {

  }
  return state
}

export default person