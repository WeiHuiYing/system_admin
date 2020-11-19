import HttpRequest from "@/libs/axios";
import config from "@/config";
const baseApi =
  process.env.NODE_ENV === "development"
    ? config.baseApi.dev
    : config.baseApi.pro;
const newApi =
  process.env.NODE_ENV === "development"
    ? config.newApi.dev
    : config.newApi.pro;

const baseLog =
  process.env.NODE_ENV === "development"
    ? config.baseLog.dev
    : config.baseLog.pro;
const AuthApi =
  process.env.NODE_ENV === "development"
    ? config.AuthApi.dev
    : config.AuthApi.pro;
const loginApi =
  process.env.NODE_ENV === "development"
    ? config.loginApi.dev
    : config.loginApi.pro;

const axios = new HttpRequest(baseApi, baseLog, AuthApi, loginApi, newApi);
axios.defaults.timeout = 600000;
export default axios;
