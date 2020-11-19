import axios from "@/libs/api.request";

export const getList = (data) => {
  return axios.request({
    url: "/newApi/api/cwAccountReport/getList/",
    method: "POST",
    data
  });
};
