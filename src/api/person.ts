import axios from './index'

interface LoginResponse {
  code: number
  msg?: string
}

// 验证是否登录
export function checkLogin(): Promise<LoginResponse> {
  return axios.get('/personal/login')
}
