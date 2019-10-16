import { queryBanner, queryList, queryShortCart } from '../../api/course'
import {
  CourseState,
  QUERY_BANNER,
  QUERY_LIST,
  QUERY_SHOPCART,
  HANDLE_SELECT,
  courseAction,
  PayLoadType,
  Tmode
} from '../type'
import { Dispatch, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

type ThunkResult<R> = ThunkAction<R, CourseState, undefined, Action<courseAction>>

const getList = (payload: PayLoadType = {}): ThunkResult<void> => {
  let { flag = 'push', limit = 10, page = 1, type = 'all' } = payload
  return async (dispatch: Dispatch) => {
    const listResult = await queryList({ limit, page, type })
    dispatch({
      type: QUERY_LIST,
      listResult,
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

const getShopCart = (state: number): ThunkResult<void> => {
  return async (dispatch: Dispatch) => {
    const shopResult = await queryShortCart(state)
    dispatch({
      type: QUERY_SHOPCART,
      shopResult,
      state
    })
  }
}

const handleSelect = (mode: Tmode): courseAction => {
  return {
    type: HANDLE_SELECT,
    mode
  }
}

const course = {
  getBannerAction,
  getList,
  getShopCart,
  handleSelect
}

export default course
