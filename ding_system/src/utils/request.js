/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import {
  extend
} from 'umi-request';

import {
  router
} from 'umi';
import {
  stringify
} from 'querystring';
import {
  notification
} from 'antd';
import config from '../../config/defaultSettings';
const loginApi = process.env.NODE_ENV === 'development' ? config.loginApi.dev : config.loginApi.pro;
const AuthApi = process.env.NODE_ENV === 'development' ? config.AuthApi.dev : config.AuthApi.pro;
const baseApi = process.env.NODE_ENV === 'development' ? config.baseApi.dev : config.baseApi.pro;
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  let {
    response
  } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    if (response.status >= 500) {
      notification.error({
        description: response.statusText,
        message: errorText,
      });
    } else if (response.status >= 401 && response.status < 500) {
      if (response.status == 401) {
        localStorage.removeItem('token');
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
      notification.error({
        description: response.statusText,
        message: errorText,
      });
    } else {
      response.json().then(msg => {
        Object.keys(msg).forEach(key => {
          notification.error({
            description: key + JSON.stringify(msg[key]),
            message: errorText,
          });
        });
      });
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// 请求前处理
request.interceptors.request.use((url, options) => {
  if (options.data && options.data.token) {
    options.headers.Authorization = options.data.token;
  } else if (localStorage.getItem('token')) {
    options.headers.Authorization = localStorage.getItem('token');
  }
  if (new RegExp('^/login/').test(url)) {
    url = loginApi + url.replace('/login/', '');
  }
  if (new RegExp('^/api/').test(url)) {
    url = baseApi + url;
  }
  if (new RegExp('^/auth/').test(url)) {
    url = AuthApi + url.replace('/auth/', '');
  }
  return {
    url,
    options,
  };
});
// 请求后处理
request.interceptors.response.use(response => {
  if (response && response.status) {
    const statusText = codeMessage[response.status] || response.statusText;
    if (response.status == 201 || response.status == 202 || response.status == 204) {
      return {
        status: response.status,
        statusText: statusText,
      };
    } else {
      return response;
    }
  }
});

export default request;
