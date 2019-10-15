import axios from './index'
import { ResponseWithData } from './types'

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

export const queryList = (
  payload: payloadType
): Promise<courseListResponse> => {
  return axios.get('/course/list', {
    params: payload
  })
}
