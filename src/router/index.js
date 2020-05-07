import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/* Layout */
import Layout from '@/layouts'
//跳转401

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为真，项目将不会显示在侧栏(默认为假)
 * alwaysShow: true               如果设置为真，将始终显示根菜单
 *                                如果不设置alwaysShow，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             该名称由<keep-alive>(必须设置!!)
 * meta : {
    roles: ['admin','editor']    控制页面角色(您可以设置多个角色)
    title: 'title'               名称显示在侧栏和面包屑(推荐设置)
    icon: 'home'                 图标显示在侧栏中
    noCache: true                如果设置为真，页面将不会被缓存(默认为假)
    affix: true                  如果设置为真，则标记将附加在标记视图中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，侧栏将突出显示您设置的路径
  }
 */

/**
* constantRoutes
*没有权限要求的基页
*所有角色都可以访问
*/
export const constantRoutes = [
    {
        path: "/login",
        name:'login',
        component: () => import("@/views/login/index"),
        hidden: true,
    },
    {
        //用于刷新的
        path: "/redirect",
        name:'redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: "/redirect/:path(.*)",
                component: () => import("@/views/redirect/index"),
            },
        ],
    },

];
/**
* asyncRoutes
*  需要根据用户角色动态加载的路由
* /
/*当settings.js里authentication配置的是intelligence时，views引入交给前端配置*/
export const asyncRoutes = [
    {
        path: "/",
        component: Layout,
        redirect: "/index",
        children: [
            {
                path: "index",
                name: "index",
                component: () => import("@/views/index/index"),
                meta: {
                    title: "首页",
                    icon: "home",
                    affix: true,
                    noCache: true,
                },
            },
        ],
    },
    {
        path: '/match',
        component: Layout,
        redirect: '/match/index',
        alwaysShow: true, // 总是显示根菜单吗
        meta: {
            title: '赛事',
            icon: 'guide',
            roles: ['admin', 'editor'] // you can set roles in root nav
        },
        children: [
            {
                path: 'create-editor-match',
                component: () => import('@/views/match/create-editor-match/index'),
                name: 'create-editor-match',
                meta: { title: '创建比赛', roles: ['admin'] }
            },
            {
                path: 'create-editor-odds',
                component: () => import('@/views/match/create-editor-odds/index'),
                name: 'create-editor-odds',
                meta: { title: '玩法赔率', roles: ['admin'] }
            }
        ],


    },



    {
        path: '/404',
        name:'404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/401',
        name:'401',
        component: () => import('@/views/401'),
        hidden: true
    },


];
//挂载constantRoutes不需要权限控制路由
const createRouter = () => new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465    卸载动态路由
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
