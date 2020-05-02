import request from '@/utils/request'

export function getTournamentList(params) {
  return request({
    url: '/v2/tournament/gettournamentlist',
    method: 'get',
    params
  })
}
