import { } from './type'
import { Action,Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

type ThunkResult<R> = ThunkAction<R, PersonState, undefined, Action<${3}Action>>

const asyncFun = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    const result = await ${1}apifunc()
    dispatch({ type: ${2},result})}}

const syncFun = (): ${3}Action => {return {type: ${4},}}

let $TM_FILENAME = {asyncFun,syncFun}
export default $TM_FILENAME
