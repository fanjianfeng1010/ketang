import { combineReducers, Reducer } from 'redux'
import course from './course'
import person from './person'
import { AllState } from '../type'

export interface AllActions {}

let rootReducer = combineReducers<AllState, any>({
  person,
  course
}) as Reducer<AllState, any>

export default rootReducer
