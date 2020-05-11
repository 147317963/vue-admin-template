import request from '@/utils/request'
export function getList(params) {
    return request({
        url: '/v2/match/getList',
        method: 'get',
        params
    })
}

export function createMatch(data) {
    return request({
        url: '/v2/match/create',
        method: 'post',
        data
    })
}

export function uptateMatch(data) {
    return  request({
            url: '/v2/match/update',
            method: 'post',
            data
        })
}
