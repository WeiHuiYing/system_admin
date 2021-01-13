// 亚马逊相关
import axios from "@/libs/api.request";

// BaseSet
// 获取已导入列表
export const asinList = data => {
  return axios.request({
    url: "/newApi/amazonAsin/getList",
    method: "POST",
    data
  });
};

// 上传对应关系
export const uploadAsin = data => {
  return axios.request({
    url: "/newApi/amazonAsin/upload",
    method: "POST",
    responseType: "blob",
    data
  });
};

// 批量更新销售人员
export const batchUpdateAsin = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/newApi/amazonAsin/batchUpdate/" + urlData,
    method: "GET"
  });
};

// Sales

/* 2020 / 09/ 09
weihuiying
三方订单明细报表*/
export const AmaOrderQuery = data => {
  return axios.request({
    url: "api/OrderReport/AmaOrderQuery",
    method: "POST",
    data
  });
};

// 导出
export const AmaOrderQueryExport = data => {
  return axios.request({
    url: "api/OrderReport/AmaOrderQueryExport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/* 2020 / 10/ 14
weihuiying
亚马逊索赔报表*/

export const AmazonClaim = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/report/amazon_claim/" + urlData,
    method: "GET",
    data
  });
};

// 导出
export const ExportAmazonClaim = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/report/amazon_claim/download_amazon_excel/" + urlData,
    method: "GET",
    data,
    responseType: "blob"
  });
};
