import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseApi = process.env.NODE_ENV === 'development' ? config.baseApi.dev : config.baseApi.pro
const baseLog = process.env.NODE_ENV === 'development' ? config.baseLog.dev : config.baseLog.pro
const AuthApi = process.env.NODE_ENV === 'development' ? config.AuthApi.dev : config.AuthApi.pro
const axios = new HttpRequest(baseApi, baseLog, AuthApi)
export default axios
