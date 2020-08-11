import axios from "@/libs/api.request";

export const getSales = data => {
  return axios.request({
    url: "/auth/connect/token/",
    method: "POST",
    data
  });
};
