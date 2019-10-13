import { personActionType, personGetInfoAction, PersonState } from '../type'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { queryInfo } from '../../api/person'
import { Dispatch } from 'redux'

type ThunkResult<R> = ThunkAction<
  R,
  PersonState,
  undefined,
  Action<personGetInfoAction>
>

const queryBaseInfo = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    const result = await queryInfo()
    dispatch({
      type: personActionType.PERSON_QUERY_BASE,
      result
    })
  }
}

let person = {
  queryBaseInfo
}

export default person
