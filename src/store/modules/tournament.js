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
            getList().then(response => {
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
