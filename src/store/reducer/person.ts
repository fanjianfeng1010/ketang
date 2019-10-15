import { Reducer } from 'redux'
import {
  PersonState,
  personAction,
  PERSON_QUERY_BASE,
  PERSON_SET_LOGIN
} from '../type'

let init_state: PersonState = {
  baseInfo: undefined,
  isLogin: false
}

const person = (state = init_state, action: personAction) => {
  let newState = JSON.parse(JSON.stringify(state)) as PersonState

  switch (action.type) {
    case PERSON_QUERY_BASE:
      let { code, data } = action.result
      if (code === 0) {
        newState.baseInfo = data
        return newState
      }
      break
    case PERSON_SET_LOGIN:
      newState.isLogin = action.login
      return newState
  }
  return newState
}

export default person as Reducer<PersonState>
