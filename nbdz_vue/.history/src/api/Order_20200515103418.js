import axios from "@/libs/api.request";

// FinancialStatement
// 订单物流查询
export const GetOrderDeliverList = data => {
  return axios.request({
    url: "api/FinancialStatement/GetOrderDeliverList",
    method: "POST",
    data
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
// 速卖通 获取平台
export const GetPlateform = () => {
  return axios.request({
    url: "api/FinancialStatement/GetPlateform",
    method: "GET"
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

// 财务报表
export const GetFinancialStatement = data => {
  return axios.request({
    url: "api/FinancialStatement/GetFinancialStatement",
    method: "POST",
    data
  });
};
export const ExportFinancialStatement = data => {
  return axios.request({
    url: "api/FinancialStatement/ExportFinancialStatement",
    method: "POST",
    data,
    responseType: "blob"
  });
};
