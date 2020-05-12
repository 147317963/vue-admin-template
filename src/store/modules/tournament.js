import { getList } from '@/api/tournament'


const state = {

    tournamentList:[],

}
const mutations = {
    SET_TOURNAMEN_LIST: (state, list) => {

        let listNew=[];
        for(let i  in list){
            listNew.push(list[i]) //值 ['aaa' 190 'man']
        }
        state.tournamentList = listNew
    }
}
const actions = {
    getList({ commit }) {
        return new Promise((resolve,reject) => {
            getList().then(res => {
                const {result} = res.data
                commit('SET_TOURNAMEN_LIST', result);
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
