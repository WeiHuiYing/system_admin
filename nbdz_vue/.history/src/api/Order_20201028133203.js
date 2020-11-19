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
// export const GetFinancialStatement = data => {
//   return axios.request({
//     url: "api/FinancialStatement/GetFinancialStatement",
//     method: "POST",
//     data
//   });
// };
// export const ExportFinancialStatement = data => {
//   return axios.request({
//     url: "api/FinancialStatement/ExportFinancialStatement",
//     method: "POST",
//     data,
//     responseType: "blob"
//   });
// };


export const GetFinancialStatement = (data) => {
  return axios.request({
    url: "/newApi/cwAccountReport/getList/",
    method: "POST",
    data,
  });
};

export const ExportFinancialStatement = (data) => {
  return axios.request({
    url: "/newApi/cwAccountReport/export/",
    method: "POST",
    responseType: "blob",
    data
  });
};



// 订单运费上传

export const uploadShippingFee = data => {
  return axios.request({
    url: "api/UploadShippingFee/uploadShippingFee",
    method: "POST",
    data,
    responseType: "blob"
  });
};



/*  
  废弃订单
  20200805
  weihuiying 
*/
export const CancelOrderReport = data => {
  return axios.request({
    url: "api/OrderReport/CancelOrderReport",
    method: "POST",
    data
  });
};
export const ExportCancelOrderReport = data => {
  return axios.request({
    url: "api/OrderReport/ExportCancelOrderReport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/*  
  发货时效报表
  20200805
  weihuiying 
*/
export const DeliveryTimeReport = data => {
  return axios.request({
    url: "api/OrderReport/DeliveryTimeReport",
    method: "POST",
    data
  });
};
export const ExportDeliveryTimeReport = data => {
  return axios.request({
    url: "api/OrderReport/ExportDeliveryTimeReport",
    method: "POST",
    data,
    responseType: "blob"
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



/*  服装动销率
  20200826
  weihuiying  */

export const OrderTurnoverRate = data => {
  return axios.request({
    url: "api/OrderReport/OrderTurnoverRate",
    method: "POST",
    data,
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
  let urlData = '?';
  Object.keys(params).forEach(key => {
    if (params[key] && params[key] != '') {
      urlData += key + '=' + params[key] + '&'
    }
  })
  urlData = urlData.substring(0, urlData.lastIndexOf('&'));
  return axios.request({
    url: "api/OrderReport/importOrderTurnoverRate" + urlData,
    method: "POST",
    data,
  });
};


/*  运费上传记录
  20200829
  weihuiying  */

export const GetUploadSheepFeeLog = data => {
  return axios.request({
    url: "api/FinancialStatement/GetUploadSheepFeeLog",
    method: "POST",
    data,
  });
};

/*  导入速卖通收款明细
  20200903
  weihuiying  */

export const ImportOrderAmount = data => {
  return axios.request({
    url: "api/OrderReport/ImportOrderAmount",
    method: "POST",
    data,
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



/* 2020 / 09/ 17
weihuiying
客户中心订单情况查询*/

export const CsOrderQuery = data => {
  return axios.request({
    url: "api/OrderReport/CsOrderQuery",
    method: "POST",
    data
  });
};
// 导出
export const CsOrderQueryExport = data => {
  return axios.request({
    url: "api/OrderReport/CsOrderQueryExport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 新品功能
// 添加新品
export const NewProductAdd = (data) => {
  return axios.request({
    url: "/newApi/product/add/",
    method: "POST",
    data,
  });
};
// 编辑新品
export const NewProductEdit = (data) => {
  return axios.request({
    url: "/newApi/product/edit/",
    method: "POST",
    data,
  });
};

// 批量停用
export const NewProductDisable = (data) => {
  return axios.request({
    url: "/newApi/product/disable",
    method: "POST",
    data
  });
};
// 获取列表
export const NewProductList = (data) => {
  return axios.request({
    url: "/newApi/product/getlist",
    method: "POST",
    data
  });
};

// 新品追踪报表
export const NewProductReport = (data) => {
  return axios.request({
    url: "/newApi/product/newProductReport",
    method: "POST",
    data
  });
};
// 上传新品
export const NewProductUpload = (data) => {
  return axios.request({
    url: "/newApi/product/upload",
    method: "POST",
    responseType: "blob",
    data
  });
};

// Jurllyshe7天未发货订单  列表获取
export const JurllysheGetList = (data) => {
  return axios.request({
    url: "/newApi/jurllyshe/getNoShippedList",
    method: "POST",
    data
  });
};
// Jurllyshe7天未发货订单 导出
export const JurllysheExportList = (data) => {
  return axios.request({
    url: "/newApi/jurllyshe/exportNoShippedList",
    method: "POST",
    responseType: "blob",
    data
  });
};



//  SKU销量明细报表
export const SkuSaleQuery = data => {
  return axios.request({
    url: "/newApi/skuSaleQuery/getList",
    method: "POST",
    data
  });
};
//  导出SKU销量明细报表
export const ExportSkuSaleQuery = data => {
  return axios.request({
    url: "/newApi/skuSaleQuery/export",
    method: "POST",
    data,
    responseType: "blob"
  });
};