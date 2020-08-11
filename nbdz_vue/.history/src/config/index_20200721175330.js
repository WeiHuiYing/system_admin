export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: 'NBCZ-Admin',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  // 报表请求地址
  baseApi: {
    dev: 'http://192.168.1.18:8817/',
    pro: 'http://8000.bitcoding.top:8888/'
  },
  // 获取权限相关
  AuthApi: {
    dev: 'http://192.168.1.234:30009/',
    pro: 'http://192.168.1.234:30009/'
  },
  // 物流请求地址
  baseLog: {
    dev: 'http://192.168.1.27:5555',
    pro: 'http://218.28.44.115:9090/qt_image/'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
