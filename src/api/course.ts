import axios from './index'
import { ResponseWithData, ResponseWithoutData } from './types'

export const queryBanner = (): Promise<ResponseWithData> => {
  return axios.get('/course/banner')
}

interface payloadType {
  limit: number
  page: number
  type: string
}
interface courseListResponse extends ResponseWithData {
  total: number
  limit: number
  page: number
}

// 查询课程列表
export const queryList = (
  payload: payloadType
): Promise<courseListResponse> => {
  return axios.get('/course/list', {
    params: payload
  })
}

// 查询课程信息
export const queryCourseInfo = (
  courseID: number
): Promise<ResponseWithData> => {
  return axios.get('/course/info', {
    params: { courseID }
  })
}

// 添加购物车
export const addToShopCart = (
  courseID: number
): Promise<ResponseWithoutData> => {
  return axios.post('/store/add', {
    courseID
  })
}

// 从购物车中移除
export const removeFormShopCart = (
  courseID: number
): Promise<ResponseWithoutData> => {
  return axios.post('/store/remove', {
    courseID
  })
}

// 获取所有已经添加到购物车的信息
export const queryShortCart = (state = 0): Promise<ResponseWithData> => {
  return axios.get('/store/info', {
    params: {
      state
    }
  })
}
