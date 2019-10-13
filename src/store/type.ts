import { Action } from 'redux'
export enum courseActionType {}

export enum personActionType {
  PERSON_QUERY_BASE = 'PERSON_QUERY_BASE'
}

export interface personGetInfoAction extends Action {
  type: personActionType.PERSON_QUERY_BASE
  result: PersonInfoResponse
}

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
}
