import { Reducer } from 'redux'
import { PersonState, personGetInfoAction, personActionType } from '../type'

let init_state: PersonState = {
  baseInfo: undefined
}

const person: Reducer<PersonState | undefined, personGetInfoAction> = (
  state = init_state,
  action: personGetInfoAction
) => {
  let newState = JSON.parse(JSON.stringify(state))

  switch (action.type) {
    case personActionType.PERSON_QUERY_BASE:
      let { code, data } = action.result
      if (code === 0) {
        newState.baseInfo = data
      }
      break
  }
  return newState
}

export default person
