// magento

import axios from "@/libs/api.request";
// other
/* 2020 / 10/ 20
weihuiying
spu导入导出*/

export const exportProductImage = data => {
  return axios.request({
    url: "/newApi/product/exportProductImage",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// sales
/* 2020 / 09/ 17
weihuiying
服装期间库存查询*/

export const ClothingPeriodQuery = data => {
  return axios.request({
    url: "api/FinancialStatement/ClothingPeriodQuery",
    method: "POST",
    data
  });
};
// 导出
export const ClothingPeriodQueryExport = data => {
  return axios.request({
    url: "api/FinancialStatement/ClothingPeriodQueryExport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// Jurllyshe7天未发货订单  列表获取
export const JurllysheGetList = data => {
  return axios.request({
    url: "/newApi/jurllyshe/getNoShippedList",
    method: "POST",
    data
  });
};
// Jurllyshe7天未发货订单 导出
export const JurllysheExportList = data => {
  return axios.request({
    url: "/newApi/jurllyshe/exportNoShippedList",
    method: "POST",
    responseType: "blob",
    data
  });
};
