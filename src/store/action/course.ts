import { queryBanner, queryList } from '../../api/course'
import {} from '../../api/types'
import {
  CourseState,
  QUERY_BANNER,
  QUERY_LIST,
  courseAction,
  PayLoadType
} from '../type'
import { Dispatch, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

type ThunkResult<R> = ThunkAction<
  R,
  CourseState,
  undefined,
  Action<courseAction>
>

const getList = (payload: PayLoadType = {}): ThunkResult<void> => {
  console.log(payload)
  let { flag = 'push', limit = 10, page = 1, type = 'all' } = payload
  console.log(payload)
  return async (dispatch: Dispatch) => {
    const result = await queryList({ limit, page, type })
    dispatch({
      type: QUERY_LIST,
      result,
      flag,
      courseType: type
    })
  }
}

const getBannerAction = (): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    const payload = await queryBanner()
    dispatch({
      type: QUERY_BANNER,
      payload
    })
  }
}

const course = {
  getBannerAction,
  getList
}

export default course
