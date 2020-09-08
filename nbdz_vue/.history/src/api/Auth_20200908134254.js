import axios from "@/libs/api.request";
import qs from "qs";

export const LoginToken = data => {
  return axios.request({
    url: "/login/connect/token",
    method: "POST",
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const getUserInfo = (data) => {
  return axios.request({
    url: "/login/connect/userinfo",
    method: "GET",
    data
  });
};

export const getUserPerm = (data) => {
  return axios.request({
    url: "/auth/api/DiyUser/getAllPerms/",
    method: "GET",
    data
  });
};
