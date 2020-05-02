module.exports = {
  title: 'Vue Element Admin',

  /**
   * @type {boolean} true | false
   * @description是否显示设置右侧面板
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description是否需要tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description是否修复标题
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description是否显示侧边栏中的徽标
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production'， 'development']
   * @description需要显示err日志组件。
   *默认值仅用于生产环境
   *如果你也想在开发中使用它，你可以通过['production'， 'development']
   */
  errorLog: 'production',

  /**
   * @type {string }
   * @description储存token名称。
   */
  tokenName:'admin_token'


}
