import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // NProgress 顶部进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取令牌
import getPageTitle from '@/utils/get-page-title'
//导入一些配置
import {
  authentication,
  loginInterception,
  routesWhiteList,
} from "@/config/settings";
NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['/login'] // 没有重定向白名单

//定义完路由后，我们主要是利用vue-router提供的钩子函数beforeEach()对路由进行判断。
router.beforeEach(async (to, from, next) => {
  // 开始进度条
  NProgress.start();
  // 设置页面标题
  document.title = getPageTitle(to.meta.title);
  // 确定用户是否已登录
  const hasToken = getToken();

    //是否有token
    if(hasToken){
      //有令牌当前情况下还访问 该login地址则跳到首页
      if (to.path === '/login') {
        next({ path: '/' });
        NProgress.done();
      }else {
        // //有具备了   就获取用户名称 方便显示在网站上
        const hasRoles = store.getters.roles && store.getters.roles.length > 0;
        if (hasRoles) {
          next();
        } else {
          //已经到了首页这些地方
          try {
            // 获取用户权限 导入异步路由
            const { roles }  = await store.dispatch('user/getInfo')
            let accessRoutes = [];
            //intelligence和all两种方式，前者后端权限只控制roles不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
            if (authentication === "intelligence") {
              accessRoutes = await store.dispatch("permission/setRoutes", roles);
            } else if (authentication === "all") {
              accessRoutes = await store.dispatch("permission/setAllRoutes");
            }
            router.addRoutes(accessRoutes);
            next({ ...to, replace: true });
          } catch (error) {
            // 删除令牌，进入登录页面重新登录
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
            NProgress.done();
          }
        }
        next();
      }

    }else {
      /* 没有令牌*/

      if (whiteList.indexOf(to.path) !== -1) {
        // 在免费登录白名单，直接去
        next();
      } else {
        // 没有访问权限的其他页面被重定向到登录页面。
        next({
          path: '/login',
          query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
        NProgress.done();
      }

    }
});

router.afterEach(() => {
  // 完成进度条
  NProgress.done()
})
