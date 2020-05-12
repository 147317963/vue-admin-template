import { getList } from '@/api/match-stage'


const state = {

    matchStageList:[],

}
const mutations = {
    SET_MATCH_STAGE_LIST: (state, list) => {
        let listNew=[];
        for(let i  in list){
            listNew.push(list[i]) //值 ['aaa' 190 'man']
        }
        state.matchStageList = listNew

    }
}
const actions = {
    getList({ commit }) {
        return new Promise((resolve,reject) => {
            getList().then(res => {
                const {result} = res.data
                commit('SET_MATCH_STAGE_LIST', result);
                resolve()
            }).catch(e => {
                reject(e)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
