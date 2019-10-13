import { combineReducers } from 'redux'
import { course, CourseState, CourseAction } from './course'
import person, { PersonAction, PersonState } from './person'

export type AllState = PersonState & CourseState

export type AllAction = PersonAction & CourseAction

let rootReducer = combineReducers<AllState, AllAction>({
  course,
  person
})

export default rootReducer