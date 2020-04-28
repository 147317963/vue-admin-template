import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 使用元。角色，以确定当前用户是否具有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ALL_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes);
  },
}

const actions = {
  setRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      //角色权限是否是admin
      if (roles.includes('admin')) {
        //是就导入全部异步路由
        accessedRoutes = asyncRoutes || []
      } else {
        //不是就查询该用户能操作的异步路由
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
