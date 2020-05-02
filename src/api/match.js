import request from '@/utils/request'

export function getMatchList(params) {
  return request({
    url: '/v2/match/getmatchlist',
    method: 'get',
    params
  })
}
