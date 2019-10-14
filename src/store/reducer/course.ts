import { Reducer, AnyAction } from 'redux'
import { CourseState } from '../type'

export interface CourseAction extends AnyAction {}

let init_state: CourseState = {}

const course: Reducer<CourseState | undefined, CourseAction> = (
  state = init_state,
  action
) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {
  }
  return state
}

export default course as Reducer<CourseState, CourseAction>
