import { Reducer } from 'redux'
import { PersonState, personActionType } from '../type'

let init_state: PersonState = {
  baseInfo: undefined,
  isLogin: false
}

const person: Reducer<PersonState | undefined, any> = (
  state = init_state,
  action
) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case personActionType.PERSON_QUERY_BASE:
      console.log(action)
      let { code, data } = action.result
      if (code === 0) {
        newState.baseInfo = data
        return newState
      }
      break
    case personActionType.PERSON_SET_LOGIN:
      newState.isLogin = action.login
      return newState
  }
  return newState
}

export default person as Reducer<PersonState, any>
