import request from '@/utils/request'
export function getList(params) {
    return request({
        url: '/v2/matchstage/getList',
        method: 'get',
        params
    })
}
