import { Reducer } from 'redux'
import { CourseState, QUERY_BANNER, QUERY_LIST, courseAction } from '../type'

let init_state: CourseState = {
  banner: [],
  courseData: {
    limit: 10,
    total: 1,
    page: 1,
    data: []
  },
  courseType: 'all'
}

const course = (state = init_state, action: courseAction) => {
  let newState = JSON.parse(JSON.stringify(state)) as CourseState

  switch (action.type) {
    case QUERY_BANNER:
      newState.banner = action.payload.data
      return newState
    case QUERY_LIST:
      let { result, flag, courseType } = action
      newState.courseType = courseType
      if (action.result.code === 0) {
        newState.courseData.total = result.total
        newState.courseData.limit = result.limit
        newState.courseData.page = result.page
        newState.courseData.data =
          flag === 'push'
            ? newState.courseData.data.concat(result.data)
            : result.data
      }
  }
  return newState
}

export default course as Reducer<CourseState>
