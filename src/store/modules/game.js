import { getGameList } from '@/api/game'


const state = {
    gameImgUrl:'//www.nmgdjkj.com',
    gameList:[],

}
const mutations = {
    SET_GAME_LIST: (state, list) => {
        state.gameList = list

    }
}
const actions = {
    getGameList({ commit }) {
        return new Promise((resolve,reject) => {
            getGameList().then(response => {
                const {result} = response.data
                commit('SET_GAME_LIST', result);
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
