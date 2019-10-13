import { combineReducers } from 'redux'
import { course, CourseState } from './course'
import person from './person'
import { PersonState } from '../type'

export interface AllState {
  person?: PersonState
  course?: CourseState
}

let rootReducer = combineReducers<AllState, any>({
  person,
  course
})

export default rootReducer
