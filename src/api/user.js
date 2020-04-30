import request from '@/utils/request'

/**
 * 登录
 * @param data
 */
export function login(data) {
  return request({
    url: '/v2/user/login',
    method: 'post',
    data
  })
}

/**
 * 获得用户信息
 * @param token
 */
export function getInfo() {
  return request({
    url: '/v2/user/getInfo',
    method: 'get',
    // params: { token }
  })
}

/**
 * 退出登录
 */
export function logout() {
  return request({
    url: '/v2/user/logout',
    method: 'post'
  })
}
