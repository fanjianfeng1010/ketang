import {
  PERSON_QUERY_BASE,
  PERSON_SET_LOGIN,
  personAction,
  PersonState
} from '../type'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { queryInfo } from '../../api/person'
import { ResponseWithData } from '../../api/types'
import { Dispatch } from 'redux'

type ThunkResult<R> = ThunkAction<
  R,
  PersonState,
  undefined,
  Action<personAction>
>
const sendmessage = (result: ResponseWithData): personAction => {
  return {
    type: PERSON_QUERY_BASE,
    result
  }
}

const queryBaseInfo = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    const result = await queryInfo()
    dispatch(sendmessage(result))
  }
}

function personSetLogin(login: boolean): any {
  return {
    type: PERSON_SET_LOGIN,
    login
  }
}

let person = {
  queryBaseInfo,
  personSetLogin
}

export default person
