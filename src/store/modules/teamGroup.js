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
            getList().then(response => {
                const {result} = response.data
                commit('SET_TEAM_GROUP_LIST', result);
                resolve()
            }).catch(error => {
                reject(error)
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
