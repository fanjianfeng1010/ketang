import { Reducer, AnyAction } from 'redux';

export interface CourseState {

}

export interface CourseAction extends AnyAction {

}

let init_state: CourseState = {

}

export const course: Reducer<CourseState | undefined, CourseAction> = (state = init_state, action) => {
  state = JSON.parse(JSON.stringify(state))

  switch (action.type) {

  }
  return state
}
