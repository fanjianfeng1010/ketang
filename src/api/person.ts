import axios from './index'
import { PersonInfoResponse } from '../store/type'

interface LoginResponse {
  code: number
  msg?: string
}

interface LogoutResponse {
  code: number
  msg: string
}

// 验证是否登录
export function checkLogin(): Promise<LoginResponse> {
  return axios.get('/personal/login')
}

export function exitLogin(): Promise<LogoutResponse> {
  return axios.get('/personal/out')
}

export function queryInfo(): Promise<PersonInfoResponse> {
  return axios.get('/personal/info')
}
