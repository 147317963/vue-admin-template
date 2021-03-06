import { getList } from '@/api/team-group'


const state = {

    teamGroupList:[],

}
const mutations = {
    SET_TEAM_GROUP_LIST: (state, list) => {
        let listNew=[];
        for(let i  in list){
            listNew.push(list[i]) //值 ['aaa' 190 'man']
        }
        state.teamGroupList = listNew

    }
}
const actions = {
    getList({ commit }) {
        return new Promise((resolve,reject) => {
            getList().then(res => {
                const {result} = res.data
                commit('SET_TEAM_GROUP_LIST', result);
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
