// 财务相关

import axios from "@/libs/api.request";

// BaseSet
/* 
2020 / 11 / 27
速卖通放款
weihuiying 
*/
//   获取导入数据
export const AliepressList = data => {
  return axios.request({
    url: "/newApi/ali/getList",
    method: "POST",
    data
  });
};
//  导出导入数据
export const ExportAliepressList = data => {
  return axios.request({
    url: "/newApi/ali/exportList",
    method: "POST",
    data,
    responseType: "blob"
  });
};
//   获取历史求和数据
export const HistoryList = data => {
  return axios.request({
    url: "/newApi/ali/getExportList",
    method: "POST",
    data
  });
};
//  导出历史求和数据
export const ExportHistoryList = data => {
  return axios.request({
    url: "/newApi/ali/exportExportList",
    method: "POST",
    data,
    responseType: "blob"
  });
};
//  获取求和数据
export const GetSumList = data => {
  return axios.request({
    url: "/newApi/ali/getSumTempList",
    method: "POST",
    data
  });
};
//导出求和数据
export const ExportSumList = data => {
  return axios.request({
    url: "/newApi/ali/exportSumTempList",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// 上传速卖通放款信息
export const uploadLoanInfo = data => {
  return axios.request({
    url: "/newApi/ali/uploadLoanInfo",
    method: "POST",
    responseType: "blob",
    data
  });
};

// 获取列表
export const getCurrency = data => {
  return axios.request({
    url: "/newApi/currency/getList",
    method: "POST",
    data
  });
};
// 编辑
export const editCurrency = data => {
  return axios.request({
    url: "/newApi/currency/edit",
    method: "POST",
    data
  });
};
// 添加
export const addCurrency = data => {
  return axios.request({
    url: "/newApi/currency/add",
    method: "POST",
    data
  });
};
// 导入
export const uploadCurrency = (data, params) => {
  let urlData = "?";
  Object.keys(params).forEach(key => {
    if (params[key] && params[key] != "") {
      urlData += key + "=" + params[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/newApi/currency/upload" + urlData,
    method: "POST",
    responseType: "blob",
    data
  });
};

// 获取东恒成本价导入数据
export const GetDHCostList = data => {
  return axios.request({
    url: "api/FinancialStatement/GetDHCostList",
    method: "POST",
    data
  });
};
