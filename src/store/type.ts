import { ResponseWithData } from '../api/types'
import { AnyAction } from 'redux'

export const PERSON_QUERY_BASE = 'PERSON_QUERY_BASE'
export type PERSON_QUERY_BASE = typeof PERSON_QUERY_BASE
export const PERSON_SET_LOGIN = 'PERSON_SET_LOGIN'
export type PERSON_SET_LOGIN = typeof PERSON_SET_LOGIN

export interface personGetInfoAction {
  type: typeof PERSON_QUERY_BASE
  result: ResponseWithData
}

export interface personSetLoginAction {
  type: typeof PERSON_SET_LOGIN
  login: boolean
}

export type personAction = personGetInfoAction | personSetLoginAction

export interface personInfo {
  id?: number
  name?: string
  email?: string
  phone?: string
}

export interface PersonState {
  baseInfo?: personInfo
  isLogin: boolean
}

// types about course

export interface courseInfo {
  total: number
  limit: number
  page: number
  data: courseListData[]
}

export interface CourseState {
  banner?: courseBannerData[]
  courseData: courseInfo
  courseType: string
}

export const QUERY_BANNER = 'QUERY_BANNER'
export type QUERY_BANNER = typeof QUERY_BANNER

export const QUERY_LIST = 'QUERY_LIST'
export type QUERY_LIST = typeof QUERY_LIST

export interface GetBanner extends AnyAction {
  type: QUERY_BANNER
  payload: ResponseWithData
}

export interface ListResponse extends ResponseWithData {
  total: number
  limit: number
  page: number
}

export interface GetList extends AnyAction {
  type: QUERY_LIST
  result: ListResponse
}

export type courseAction = GetBanner | GetList

export interface courseBannerData {
  id: number
  name: string
  pic: string
  date: string
  address: string
  time: string
  dec: string
  price: number
  type: string
}

export interface courseListData {
  id: number
  name: string
  pic: string
  date: string
  address: string
  time: string
  dec: string
  price: number
  type: string
}

export interface PayLoadType {
  limit?: number
  page?: number
  flag?: string
  courseType?: string
  type?: string
}

export interface AllState {
  person: PersonState
  course: CourseState
}
