import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'



import "./plugins";//加载项目所需的插件


Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
