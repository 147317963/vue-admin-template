import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v2/tournament/getList',
    method: 'get',
    params
  })
}
export function createTournament(data) {
  return request({
    url: '/v2/tournament/create',
    method: 'post',
    data
  })
}

export function uptateTournament(data) {
  return request({
    url: '/v2/tournament/update',
    method: 'post',
    data
  })
}
