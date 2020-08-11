import axios from "@/libs/api.request";

export const LoginToken = data => {
  return axios.request({
    url: "/login/connect/token/",
    method: "POST",
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};
