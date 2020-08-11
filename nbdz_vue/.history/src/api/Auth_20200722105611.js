import axios from "@/libs/api.request";

export const getToken = data => {
  return axios.request({
    url: "/auth/connect/token/",
    method: "POST",
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
};
