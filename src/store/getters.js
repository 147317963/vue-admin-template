const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,//token
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,//角色权限
  routes: state => state.permission.routes, //动态路由
  errorLogs: state => state.errorLog.logs,//错误信息
  tokenName: state => state.settings.tokenName,//储存token名称
  showSettings: state => state.settings.showSettings,
  needTagsView: state => state.settings.tagsView,
  fixedHeader: state => state.settings.fixedHeader,
  gameImgUrl:state=>state.game.gameImgUrl,//游戏图片头部url
  gameList:state=>state.game.gameList,//游戏列表
  tournamentList:state=>state.tournament.tournamentList,//获得游戏比赛列表
  teamGroupList:state=>state.teamGroup.teamGroupList,//获得团队列表
  matchStageList:state=>state.matchStage.matchStageList,//获得比赛阶段
}
export default getters
