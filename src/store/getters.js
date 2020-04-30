const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,//角色权限
  routes: state => state.permission.routes, //异步路由
  errorLogs: state => state.errorLog.logs,//错误信息
  showSettings: state => state.settings.showSettings,
  needTagsView: state => state.settings.tagsView,
  fixedHeader: state => state.settings.fixedHeader
}
export default getters
