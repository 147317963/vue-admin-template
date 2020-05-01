import request from '@/utils/request'

export function getGameList(params) {
  return request({
    url: '/v2/game/index',
    method: 'get',
    params
  })
}
