import {
  personActionType,
  personAction,
  PersonState,
  PersonInfoResponse
} from '../type'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { queryInfo } from '../../api/person'
import { Dispatch } from 'redux'

type ThunkResult<R> = ThunkAction<
  R,
  PersonState,
  undefined,
  Action<personAction>
>
const sendmessage = (result: PersonInfoResponse): personAction => {
  return {
    type: personActionType.PERSON_QUERY_BASE,
    result
  }
}

const queryBaseInfo = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    const result = await queryInfo()
    console.log(result)
    dispatch(sendmessage(result))
  }
}

function personSetLogin(login: boolean): any {
  return {
    type: personActionType.PERSON_SET_LOGIN,
    login
  }
}

let person = {
  queryBaseInfo,
  personSetLogin
}

export default person
