import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/v2/teamgroup/getList',
    method: 'get',
    params
  })
}
export function createTeamGroup(data) {
  return request({
    url: '/v2/teamgroup/create',
    method: 'post',
    data
  })
}
export function uptateTeamGroup(data) {
  return request({
    url: '/v2/teamgroup/update',
    method: 'post',
    data
  })
}
