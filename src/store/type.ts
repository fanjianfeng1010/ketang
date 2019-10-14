export enum courseActionType {}

export enum personActionType {
  PERSON_QUERY_BASE = 'PERSON_QUERY_BASE',
  PERSON_SET_LOGIN = 'PERSON_SET_LOGIN'
}

export interface personGetInfoAction {
  type: typeof personActionType.PERSON_QUERY_BASE
  result: PersonInfoResponse
}

export interface personSetLoginAction {
  type: typeof personActionType.PERSON_QUERY_BASE
  login: boolean
}

export type personAction = personGetInfoAction | personSetLoginAction

export interface personInfo {
  id?: number
  name?: string
  email?: string
  phone?: string
}

export interface PersonInfoResponse {
  code?: number
  msg?: string
  data?: personInfo
}

export interface PersonState {
  baseInfo?: personInfo
  isLogin: boolean
}

export interface CourseState {}

export interface AllState {
  person: PersonState
  course: CourseState
}
