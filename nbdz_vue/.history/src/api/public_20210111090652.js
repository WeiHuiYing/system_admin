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

// 速卖通 获取平台
export const GetPlateform = () => {
  return axios.request({
    url: "api/FinancialStatement/GetPlateform",
    method: "GET"
  });
};
// 速卖通 获取店铺列表
export const GetShop = data => {
  let url;
  if (data) {
    url = "api/FinancialStatement/GetShop?Plateform=" + data;
  } else {
    url = "api/FinancialStatement/GetShop";
  }
  return axios.request({
    url: url,
    method: "GET"
  });
};
