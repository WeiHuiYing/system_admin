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
