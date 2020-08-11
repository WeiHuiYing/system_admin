import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseApi = process.env.NODE_ENV === 'development' ? config.baseApi.dev : config.baseApi.pro
const baseLog = process.env.NODE_ENV === 'development' ? config.baseLog.dev : config.baseLog.pro
const axios = new HttpRequest(baseApi, baseLog)
export default axios
