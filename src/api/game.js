import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v2/game/getList',
    method: 'get',
    params
  })
}
export function createMame(data) {
  return request({
    url: '/v2/game/create',
    method: 'post',
    data
  })
}
export function uptateGame(data) {
  return request({
    url: '/v2/game/update',
    method: 'post',
    data
  })
}
