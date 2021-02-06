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

/*  服装动销率
  20200826
  weihuiying  */

export const OrderTurnoverRate = data => {
  return axios.request({
    url: "api/OrderReport/OrderTurnoverRate",
    method: "POST",
    data
  });
};

export const ExportOrderTurnoverRate = data => {
  return axios.request({
    url: "api/OrderReport/OrderTurnoverRateExport",
    method: "POST",
    data,
    responseType: "blob"
  });
};
export const ImportOrderTurnoverRate = (data, params) => {
  let urlData = "?";
  Object.keys(params).forEach(key => {
    if (params[key] && params[key] != "") {
      urlData += key + "=" + params[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "api/OrderReport/importOrderTurnoverRate" + urlData,
    method: "POST",
    data
  });
};

// 平均成本及重量查询
export const GetAvgCostList = data => {
  return axios.request({
    url: "/newApi/jurllyshe/getAvgCostList",
    method: "POST",
    data
  });
};

// 综合站报表_发货及拆分单量查询
export const GetCountShip = data => {
  return axios.request({
    url: "/newApi/jurllyshe/getCountShipAndSplitList",
    method: "GET",
    data
  });
};

// 获取未发货订单
export const GetUndelivered = data => {
  return axios.request({
    url: "/newApi/jurllyshe/getSkuNotWarehouseList",
    method: "POST",
    data
  });
};

// 发送邮件
export const GetSendMail = data => {
  return axios.request({
    url: "/newApi/jurllyshe/sendSkuNotWarehouseEmail",
    method: "POST",
    data
  });
};

// 上传SKu
export const UploadSku = data => {
  return axios.request({
    url: "/newApi/jurllyshe/uploadSkuNotWarehouse",
    method: "POST",
    data
  });
};
