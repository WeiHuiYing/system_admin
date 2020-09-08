import axios from 'axios'
import {
  getToken
} from '@/libs/util'
// import { Spin } from 'iview'
var token = getToken();
class HttpRequest {
  constructor(baseApi = baseApi, baseLog = baseLog, AuthApi = AuthApi, loginApi = loginApi) {
    this.baseApi = baseApi
    this.baseLog = baseLog
    this.AuthApi = AuthApi
    this.loginApi = loginApi
    this.queue = {}
  }
  getInsideConfig(options) {
    let config = {}
    if (new RegExp("^api/").test(options.url) === true) {
      config = {
        baseURL: this.baseApi,
        headers: {
          //
        }
      }
    } else if (new RegExp("^/log/").test(options.url)) {
      config = {
        baseURL: this.baseLog,
        headers: {
          //
        }
      }
    } else if (new RegExp("^/auth/").test(options.url)) {
      config = {
        baseURL: this.AuthApi,
        headers: {
          // 
        }
      }
    } else if (new RegExp("^/login/").test(options.url)) {
      config = {
        baseURL: this.loginApi,
        headers: {
          // 
        }
      }
    }
    //全局请求头 cts 添加
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const {
        data,
        status,
      } = res
      return {
        data,
        status,
      }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const {
          request: {
            statusText,
            status
          },
          config
        } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: {
            responseURL: config.url
          }
        }
      }
      //cts add
      if (errorInfo.status == "401" && window.location.hash == '#login') {
        return Promise.reject(error);
      }
      if (errorInfo.status == "401") {
        // window.location.reload();
      }
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(options), options)
    options.url = options.url.replace("/log/", "")
    options.url = options.url.replace("/auth/", "")
    options.url = options.url.replace("/login/", "")
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
