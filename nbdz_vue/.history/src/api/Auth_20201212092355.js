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

export const getUserInfo = data => {
  return axios.request({
    url: "/login/connect/userinfo",
    method: "GET",
    data
  });
};

export const getUserPerm = data => {
  return axios.request({
    url: "/auth/api/DiyUser/getAllPerms/",
    method: "GET",
    data
  });
};

export const getUserClients = data => {
  return axios.request({
    url: "/auth/api/DiyUser/hasUserClient/",
    method: "GET",
    data
  });
};

export const passwordChange = (data, method) => {
  return axios.request({
    url: "/auth/api/Users/ChangePassword/",
    method,
    data
  });
};

export const getDataPerms = ({ data, method }) => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/auth/api/Open/getDataPerms/" + urlData,
    method
  });
};
