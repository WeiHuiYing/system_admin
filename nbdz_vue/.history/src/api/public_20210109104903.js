// 公用
import axios from "@/libs/api.request";

// 列表
export const getWareList = data => {
  return axios.request({
    url: "api/ECWarehouse/GetList/",
    method: "POST",
    data
  });
};
// 详情
export const getWareDetails = data => {
  return axios.request({
    url: "api/ECWarehouse/Get/",
    method: "POST",
    data
  });
};
