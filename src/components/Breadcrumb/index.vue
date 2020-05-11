<template>
<!--  面包削-->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // 只显示带 meta.title的路由

      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]


      // if (!this.isDashboard(first)) {
      //   matched = [{ path: '/', meta: { title: '首页' }}].concat(matched)
      // }

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)


    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {

      // 为了解决这个问题 https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route

      var toPath = pathToRegexp.compile(path)

      return toPath(params)
    },
    handleLink(item) {
      //如有重定就优先 定向
      const { redirect, path } = item
      if (redirect) {
        // this.$router.push({
        //   redirect,
        //   query: {
        //     t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        //   }
        // });
        this.$router.push(redirect)
        return
      }
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
