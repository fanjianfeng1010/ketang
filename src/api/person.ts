import axios from './index'
import { ResponseWithData, ResponseWithoutData } from './types'

// 验证是否登录
export function checkLogin(): Promise<ResponseWithoutData> {
  return axios.get('/personal/login')
}

export function exitLogin(): Promise<ResponseWithoutData> {
  return axios.get('/personal/out')
}

export function queryInfo(): Promise<ResponseWithData> {
  return axios.get('/personal/info')
}

export function login(payload: any): Promise<ResponseWithoutData> {
  return axios.post('/personal/login', payload)
}

export function register(payload: any): Promise<ResponseWithoutData> {
  return axios.post('/personal/register', payload)
}
