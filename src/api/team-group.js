import request from '@/utils/request'

export function getTeamGroupList(params) {
  return request({
    url: '/v2/teamgroup/getteamgrouplist',
    method: 'get',
    params
  })
}
