export default {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'sidemenu',
  contentWidth: 'Fluid',
  fixedHeader: false,
  autoHideHeader: false,
  fixSiderbar: false,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'NBDZ',

  // 登录
  loginApi: {
    dev: "http://218.28.44.115:5000/",
    pro: "http://218.28.44.115:5000/"
  },
  // 获取权限相关
  AuthApi: {
    dev: "http://218.28.44.115:5001/",
    pro: "http://218.28.44.115:5001/"
  },
  // 营销系统
  baseApi: {
    dev: 'http://8000.bitcoding.top:8888/',
    pro: 'http://8000.bitcoding.top:8888/'
  },
  pwa: false,
  iconfontUrl: '',
};
