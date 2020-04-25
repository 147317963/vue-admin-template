import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
/* Layout */
import Layout from '@/layout'

const routes = [
    {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "about" */'@/views/404'),
        hidden: true
    },
    {
        path: '/401',
        name: '401',
        component: () => import(/* webpackChunkName: "about" */'@/views/401'),
        hidden: true
    },
    /**
     * 登录
     */
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '@/views/login/index'),
        hidden: true,
    },
    {
        path: '/',
        component: Layout,
        redirect: '/index',
        children: [{
            path: '/index',
            name: 'index',
            component: () => import(/* webpackChunkName: "about" */'@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },
]


const createRouter = () => new VueRouter({
    // 模式:'history'， //需要服务支持
    scrollBehavior: () => ({y: 0}),
    routes: routes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
