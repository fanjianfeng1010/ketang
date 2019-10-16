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

export interface shopCart {
  unpay: courseListData[]
  pay: courseListData[]
}

export interface CourseState {
  banner?: courseBannerData[]
  courseData: courseInfo
  courseType: string
  shopCart: shopCart
  selectAll: boolean
}

export const QUERY_BANNER = 'QUERY_BANNER'
export type QUERY_BANNER = typeof QUERY_BANNER

export const QUERY_LIST = 'QUERY_LIST'
export type QUERY_LIST = typeof QUERY_LIST

export const QUERY_SHOPCART = 'QUERY_SHOPCART'
export type QUERY_SHOPCART = typeof QUERY_SHOPCART

export const HANDLE_SELECT = 'HANDLE_SELECT'
export type HANDLE_SELECT = typeof HANDLE_SELECT

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
  listResult: ListResponse
}

export interface QueryShopCart extends AnyAction {
  type: QUERY_SHOPCART
  shopResult: ResponseWithData
  state: number
}

export type Tmode = string | number
export interface HandleSelect extends AnyAction {
  type: HANDLE_SELECT
  mode: Tmode
}

export type courseAction = GetBanner | GetList | QueryShopCart | HandleSelect

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
  check: boolean
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
