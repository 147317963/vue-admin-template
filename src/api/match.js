import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v2/match/getlist',
    method: 'get',
    params
  })
}
