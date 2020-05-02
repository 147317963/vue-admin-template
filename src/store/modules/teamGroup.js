import { getTeamGroupList } from '@/api/team-group'


const state = {

    teamGroupList:[],

}
const mutations = {
    SET_TEAM_GROUP_LIST: (state, list) => {
        state.teamGroupList = list

    }
}
const actions = {
    getTeamGroupList({ commit }) {
        return new Promise((resolve,reject) => {
            getTeamGroupList().then(response => {
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
