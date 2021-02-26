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
// FinalCost

// 计算期末库存
export const execPeriodEnd = params => {
  let urlData = "?";
  Object.keys(params.data).forEach(key => {
    if (params.data[key] && params.data[key] != "") {
      urlData += key + "=" + params.data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/newApi/financial/execPeriodEnd" + urlData,
    method: params.method
  });
};

// 导出期间成本
export const exportPeriodCostList = params => {
  return axios.request({
    url: "/newApi/financial/exportPeriodCostList",
    method: params.method,
    data: params.data,
    responseType: "blob"
  });
};

// 导出期间SKU成本
export const exportPeriodSkuCostList = params => {
  return axios.request({
    url: "/newApi/financial/exportPeriodSkuCostList",
    method: params.method,
    data: params.data,
    responseType: "blob"
  });
};

// 期间成本查询
export const getPeriodCostList = params => {
  return axios.request({
    url: "/newApi/financial/getPeriodCostList",
    method: params.method,
    data: params.data
  });
};

// 期间SKU成本查询
export const getPeriodSkuCostList = params => {
  return axios.request({
    url: "/newApi/financial/getPeriodSkuCostList",
    method: params.method,
    data: params.data
  });
};

// 产品成本列表
export const getPeriodSkuInv = params => {
  return axios.request({
    url: "/newApi/financial/getPeriodSkuInv",
    method: params.method,
    data: params.data
  });
};

export const exportPeriodSkuInv = params => {
  return axios.request({
    url: "/newApi/financial/exportPeriodSkuInv",
    method: params.method,
    data: params.data,
    responseType: "blob"
  });
};

// 取消结账处理期末数据

export const execCancelPeriodEnd = params => {
  let urlData = "?";
  Object.keys(params.data).forEach(key => {
    if (params.data[key] && params.data[key] != "") {
      urlData += key + "=" + params.data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/newApi/financial/execCancelPeriodEnd" + urlData,
    method: params.method
  });
};

// Sales

// 财务订单合计报表
export const OrderCostTotal = data => {
  return axios.request({
    url: "/newApi/financial/cost?total=" + data.total,
    method: "POST",
    data: data.data
  });
};

// 导出财务订单合计报表
export const ExportOrderCostTotal = data => {
  return axios.request({
    url: "/newApi/financial/cost",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// 财务报表
export const GetFinancialStatement = data => {
  return axios.request({
    url: "/newApi/cwAccountReport/getList/",
    method: "POST",
    data
  });
};

export const ExportFinancialStatement = data => {
  return axios.request({
    url: "/newApi/cwAccountReport/export/",
    method: "POST",
    responseType: "blob",
    data
  });
};

/*  导入速卖通收款明细
  20200903
  weihuiying  */

export const ImportOrderAmount = data => {
  return axios.request({
    url: "api/OrderReport/ImportOrderAmount",
    method: "POST",
    data
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

/*  
  营销订单统计报表
  20200814
  weihuiying 
*/
export const MarketingOrderReport = data => {
  return axios.request({
    url: "api/OrderReport/MarketingOrderReport",
    method: "POST",
    data
  });
};
export const ExportMarketingOrderReport = data => {
  return axios.request({
    url: "api/OrderReport/ExportMarketingOrderReport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/* 2020 / 07 / 28
weihuiying
订单数量报表 */
// 订单数量报表
export const SaleNumberReport = data => {
  return axios.request({
    url: "api/OrderReport/OrderSaleNumberReport",
    method: "POST",
    data
  });
};
// 导出
export const exportSaleNumberReport = data => {
  return axios.request({
    url: "api/OrderReport/ExportOrderSaleNumberReport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/* 2020 / 07 / 24
weihuiying
产品销售分析报表 */

// 产品销售分析
export const SkuSaleReport = data => {
  return axios.request({
    url: "api/OrderReport/SkuSaleQueryItemReport",
    method: "POST",
    data
  });
};
// 导出
export const exportSkuSaleReport = data => {
  return axios.request({
    url: "api/OrderReport/ExportSkuSaleQueryItemReport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 获取
export const GetUploadSheepFeeLog = data => {
  return axios.request({
    url: "api/FinancialStatement/GetUploadSheepFeeLog",
    method: "POST",
    data
  });
};

/* 2021 / 02 / 20
weihuiying
获取paypal交易信息 */
// 获取paypal交易信息
export const GetPaypalInfo = data => {
  return axios.request({
    url: "/newApi/financial/getPaypalTransInfoList",
    method: "POST",
    data
  });
};
// 导出
export const ExportPaypalInfo = data => {
  return axios.request({
    url: "/newApi/financial/exportPaypalTransInfoList",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/* 2021 / 02 / 25
weihuiying
SKU标准售价  */

// SKU标准售价
export const GetSkuBasePriceList = data => {
  return axios.request({
    url: "/newApi/product/getSkuBasePriceList",
    method: "POST",
    data
  });
};
// 导入
export const ImportSkuBasePrice = data => {
  return axios.request({
    url: "/newApi/product/importSkuBasePrice",
    method: "POST",
    data
  });
};

/* 2021 / 02 / 25
weihuiying
TOP5店铺订单汇总  */

// TOP5店铺 汇总
export const GetTop5Platform = data => {
  return axios.request({
    url: "/newApi/product/getTop5ShipPlatformList",
    method: "POST",
    data
  });
};
// 导出
export const ExportTop5Platform = data => {
  return axios.request({
    url: "/newApi/product/exportTop5ShipPlatformList",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// TOP5发货订单 汇总
export const GetTop5Ship = data => {
  return axios.request({
    url: "/newApi/product/getTop5ShipDetailList",
    method: "POST",
    data
  });
};
// 导出
export const ExportTop5Ship = data => {
  return axios.request({
    url: "/newApi/product/exportTop5ShipDetailList",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/* 2021 / 02 / 26
weihuiying
亚马逊销售明细  */

// 亚马逊销售明细
export const GetAmazonTransaction = data => {
  return axios.request({
    url: "/newApi/financial/getAmazonTransactionList",
    method: "POST",
    data
  });
};
// 导入
export const ImportAmazonTransaction = data => {
  return axios.request({
    url: "/newApi/financial/importAmazonTransactionList",
    method: "POST",
    data
  });
};
