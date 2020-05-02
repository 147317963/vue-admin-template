import { getTournamentList } from '@/api/tournament'


const state = {

    tournamentList:[],

}
const mutations = {
    SET_TOURNAMEN_LIST: (state, list) => {
        state.tournamentList = list

    }
}
const actions = {
    getTournamentList({ commit }) {
        return new Promise((resolve,reject) => {
            getTournamentList().then(response => {
                const {result} = response.data
                commit('SET_TOURNAMEN_LIST', result);
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
