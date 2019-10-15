import { Reducer } from 'redux'
import {
  CourseState,
  QUERY_BANNER,
  QUERY_LIST,
  QUERY_SHOPCART,
  courseAction
} from '../type'

let init_state: CourseState = {
  banner: [],
  courseData: {
    limit: 10,
    total: 1,
    page: 1,
    data: []
  },
  courseType: 'all',
  shopCart: {
    unpay: [],
    pay: []
  }
}

const course = (state = init_state, action: courseAction) => {
  let newState = JSON.parse(JSON.stringify(state)) as CourseState

  switch (action.type) {
    case QUERY_BANNER:
      newState.banner = action.payload.data
      return newState
    case QUERY_LIST:
      let { listResult, flag, courseType } = action
      newState.courseType = courseType
      if (action.listResult.code === 0) {
        newState.courseData.total = listResult.total
        newState.courseData.limit = listResult.limit
        newState.courseData.page = listResult.page
        newState.courseData.data =
          flag === 'push'
            ? newState.courseData.data.concat(listResult.data)
            : listResult.data
      }
      break
    case QUERY_SHOPCART: {
      let { shopResult, state } = action
      if (shopResult.code === 0) {
        state === 0
          ? (newState.shopCart.unpay = shopResult.data)
          : (newState.shopCart.pay = shopResult.data)
      }
    }
  }
  return newState
}

export default course as Reducer<CourseState>
