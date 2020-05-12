import { getList } from '@/api/game'


const state = {
    gameImgUrl:'//www.nmgdjkj.com',
    gameList:[],

}
const mutations = {
    SET_GAME_LIST: (state, list) => {
        let listNew=[];
        for(let i  in list){
            listNew.push(list[i]) //值 ['aaa' 190 'man']

        }
        state.gameList = listNew;

    }
}
const actions = {
    getList({ commit }) {
        return new Promise((resolve,reject) => {
            getList().then(res => {
                const {result} = res.data
                commit('SET_GAME_LIST', result);
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
