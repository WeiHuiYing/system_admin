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

// E贸易账户列表
export const getEAccount = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/e_trade/e_trade_account/" + urlData,
    method: "GET"
  });
};

/*  查询速卖通收款明细
  20200903
  weihuiying  */
export const OrderAmount = data => {
  return axios.request({
    url: "api/OrderReport/OrderAmount",
    method: "POST",
    data
  });
};

// 获取复购客户导入数据
export const GetRepeatCustList = data => {
  return axios.request({
    url: "api/FinancialStatement/GetRepeatCustList",
    method: "POST",
    data
  });
};
// 复购客户导出数据
export const ExportRepeatCust = data => {
  return axios.request({
    url: "api/FinancialStatement/ExportRepeatCust",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/* 获取店铺列表
2020 / 10 / 26
weihuiying */

export const getShop = data => {
  return axios.request({
    url: "/newApi/storeCompany/getList",
    method: "POST",
    data
  });
};
// 编辑
export const editShop = data => {
  return axios.request({
    url: "/newApi/storeCompany/edit",
    method: "POST",
    data
  });
};
// 添加
export const addShop = data => {
  return axios.request({
    url: "/newApi/storeCompany/add",
    method: "POST",
    data
  });
};

// Cost

// Amazon交易记录
export const GetAmazonList = data => {
  return axios.request({
    url: "api/FinancialStatement/GetAmazonList",
    method: "POST",
    data
  });
};
// Amazon交易详情
export const GetAmazonDetailList = data => {
  return axios.request({
    url: "api/FinancialStatement/GetAmazonDetailList",
    method: "POST",
    data
  });
};

/* 2020 / 07 / 28
weihuiying
运费报表 */
// 运费报表
export const ShipFeeReport = data => {
  return axios.request({
    url: "api/OrderReport/ShipFeeOrderQueryReport",
    method: "POST",
    data
  });
};
// 导出
export const exportShipFeeReport = data => {
  return axios.request({
    url: "api/OrderReport/ExportShipFeeOrderQueryReport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// PayPal交易记录
export const GetPaypalList = data => {
  return axios.request({
    url: "api/FinancialStatement/GetPaypalList",
    method: "POST",
    data
  });
};

//  获取运费对账分析报表
export const getShipFeeList = data => {
  return axios.request({
    url: "/newApi/order/getShipFeeList",
    method: "POST",
    data
  });
};
//  导出运费对账分析报表
export const exportShipFeeList = data => {
  return axios.request({
    url: "/newApi/order/exportShipFeeList",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/*  
  算运费报表
  20200820
  weihuiying 
*/
export const WagesShipFee = data => {
  return axios.request({
    url: "api/FinancialStatement/WagesShipFee",
    method: "POST",
    data
  });
};
export const ExportWagesShipFee = data => {
  return axios.request({
    url: "api/FinancialStatement/ExportWagesShipFee",
    method: "POST",
    data,
    responseType: "blob"
  });
};
