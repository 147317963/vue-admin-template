import {login, logout, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import {resetRouter} from '@/router'
import CryptoJS from 'crypto-js';
import { Notification } from "element-ui";


const state = {
    token:getToken(),
    name:'',
    roles:[],
    avatar:'',
}

const mutations = {
    //重置状态
    RESET_STATE: (state,token) => {
        state.token = token;
    },
    //设置token
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    //设置name
    SET_NAME: (state, name) => {
        state.name = name
    },
    //设置图片地址
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
}

const actions = {
    // 用户登录
    login({commit}, userInfo) {
        // deviceId= 0b07a868db269792a4528edb81527795 最好带这个数据传输  防止爆破
        const key = CryptoJS.enc.Utf8.parse('1234567890654321'); //为了避免补位，直接用16位的秘钥
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); //16位初始向量
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({
                username: username.trim(), password: CryptoJS.AES.encrypt(password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString()
            }).then(response => {
                const {data} = response
                commit('SET_TOKEN', data.token);
                setToken(data.token)
                const time = new Date();
                const hour = time.getHours();
                const thisTime =
                    hour < 8 ? "早上好" : hour <= 11 ? "上午好" : hour <= 13 ? "中午好" : hour < 18 ? "下午好" : "晚上好";
                Notification({
                    title: thisTime + "!",
                    message: "欢迎登录",
                    type: "success",
                    duration: 2000,
                });
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取用户信息
    getInfo({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const {datas} = response.data
                if (!datas) {
                    reject('验证失败，请重新登录...')
                }
                const {name, avatar,roles} = datas
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_ROLES', roles)
                resolve(datas)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 用户注销
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                removeToken() // 必须先删除令牌
                resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 删除令牌
    resetToken({commit}) {
        return new Promise(resolve => {
            removeToken() // 必须先删除令牌
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {namespaced: true, state, mutations, actions}

