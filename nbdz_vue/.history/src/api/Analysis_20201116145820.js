import axios from "@/libs/api.request";

// SingleSalesAnalysis 销售报表
export const getSales = data => {
  return axios.request({
    url: "api/SingleSalesAnalysis/GetPage/",
    method: "POST",
    data
  });
};

//BnsUsBaseInventory 美国仓仓底维护

// 获取列表
export const getUsBase = data => {
  return axios.request({
    url: "api/BnsUsBaseInventory/GetPage/",
    method: "POST",
    data
  });
};

// 获取单个数据
export const getUsBaseInfo = data => {
  return axios.request({
    url: "api/BnsUsBaseInventory/Get",
    method: "POST",
    data
  });
};

// 类型列表 UsTagTypeInventory
// 获取列表
export const getUsInventoryList = data => {
  return axios.request({
    url: "api/UsTagTypeInventory/GetPage",
    method: "POST",
    data
  });
};

// ECShipBatch 头层出库单

// 获取列表
/* export const getShipList = data => {
  return axios.request({
    url: "api/ECShipBatch/getList",
    method: "POST",
    data
  });
}; */

// 头层出库单  批次订单   生成 获取
export const getShipList = (data, method) => {
  if (method == "GET") {
    if (data.id) {
      return axios.request({
        url: "/log/e_trade/ship_batch/" + data.id + "/",
        method: method
      });
    } else {
      let urlData = "?";
      Object.keys(data).forEach(key => {
        if (data[key] && data[key] != "") {
          urlData += key + "=" + data[key] + "&";
        }
      });
      urlData = urlData.substring(0, urlData.lastIndexOf("&"));
      return axios.request({
        url: "/log/e_trade/ship_batch/" + urlData,
        method: method
      });
    }
  }
};

// 生成E贸易订单
export const createEorder = (data, method) => {
  if (method == "POST") {
    let urlData = "?";
    Object.keys(data).forEach(key => {
      if (data[key] && data[key] != "") {
        urlData += key + "=" + data[key] + "&";
      }
    });
    urlData = urlData.substring(0, urlData.lastIndexOf("&"));
    return axios.request({
      url: "/log/e_trade/order/create_e_trade_order/" + urlData,
      method: method
    });
  }
};

/* 2020 / 08 / 05
weihuiying
E贸易订单列表 */
export const getEOrder = data => {
  if (data.id) {
    return axios.request({
      url: "/log/e_trade/order/" + data.id + "/",
      method: "GET"
    });
  } else {
    let urlData = "?";
    Object.keys(data).forEach(key => {
      if (data[key] && data[key] != "") {
        urlData += key + "=" + data[key] + "&";
      }
    });
    urlData = urlData.substring(0, urlData.lastIndexOf("&"));
    return axios.request({
      url: "/log/e_trade/order/" + urlData,
      method: "GET"
    });
  }
};

// 拉取订单
export const getOrderData = () => {
  return axios.request({
    url: "/log/e_trade/ship_batch/download_order/",
    method: "GET"
  });
};
// E贸易订单批量撤单
export const batchConfirmRepeal = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/e_trade/order/batch_confirm_repeal/" + urlData,
    method: "POST"
  });
};
// E贸易订单批量提交
export const batchConfirmSubmit = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/e_trade/order/batch_confirm_submit/" + urlData,
    method: "POST"
  });
};

// 头程出货单
export const GetECFbaHead = data => {
  return axios.request({
    url: "api/ECHeadTrip/GetECFbaHeadTripLinesPage",
    method: "POST",
    data
  });
};
// 头程出货单导出
export const ExportECFbaHead = data => {
  return axios.request({
    url: "api/ECHeadTrip/ExportECHeadTripLines",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// 头程出货单 店铺筛选的店铺列表
export const ECGetShop = () => {
  return axios.request({
    url: "api/ECHeadTrip/GetShop",
    method: "GET"
  });
};

// 添加头层入库单
export const addShip = data => {
  return axios.request({
    url: "api/ECShipBatch/addShipBatch",
    method: "POST",
    data
  });
};

// 发帘发块分产品尺寸销售占比
export const GetWeavingBlock = data => {
  return axios.request({
    url: "api/SaleOrderReport/GetWeavingBlock",
    method: "POST",
    data
  });
};

// 头套产品销售明细
/* export const GetDensity = data => {
  return axios.request({
    url: "api/SaleOrderReport/GetDensity",
    method: "POST",
    data
  });
}; */

/* 2020 / 10 / 26
更新新接口 */
export const GetDensity = data => {
  return axios.request({
    url: "/newApi/headgearDensity/getList",
    method: "POST",
    data
  });
};
// 商品款式
export const GetDensityStyle = () => {
  return axios.request({
    url: "api/SaleOrderReport/GetDensityStyle",
    method: "Get"
  });
};

// 销售汇总报表
export const TotalSale = data => {
  return axios.request({
    url: "api/TotalSale",
    method: "POST",
    data
  });
};

export const GetProductCategoryList = () => {
  return axios.request({
    url: "api/TotalSale/GetProductCategoryList",
    method: "POST"
  });
};

// 发帘发块分款式销售占比报表
export const HairWeftStyleSale = data => {
  return axios.request({
    url: "api/HairWeftStyleSale",
    method: "POST",
    data
  });
};

// 单条订单与多条订单占比
export const GetOddMinusSale = data => {
  return axios.request({
    url: "api/SaleOrderReport/GetOddMinusSale",
    method: "POST",
    data
  });
};

// 各店铺各等级产品销量汇总
export const ChannelLevelSalesCount = data => {
  return axios.request({
    url: "api/ChannelLevelSalesCount/index",
    method: "POST",
    data
  });
};

// 美国仓unice货物和通用货物剩余库存报表
export const UsUiceNomalSkuQty = data => {
  return axios.request({
    url: "api/UsUiceNomalSkuQty/GetList",
    method: "POST",
    data
  });
};
export const ExportUsUiceNomalSkuQty = data => {
  return axios.request({
    url: "api/UsUiceNomalSkuQty/ExportUsUiceNomalSkuQty",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 财务订单合计报表
export const OrderCostTotal = data => {
  return axios.request({
    url: "api/FinancialStatement/OrderCostTotal?total=" + data.total,
    method: "POST",
    data: data.data
  });
};

// 导出财务订单合计报表
export const ExportOrderCostTotal = data => {
  return axios.request({
    url: "api/FinancialStatement/ExportOrderCostTotal",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 库存查询
export const GetInventorySku = data => {
  return axios.request({
    url: "api/InventoryQuery/GetInventorySku",
    method: "POST",
    data
  });
};

export const ExportInventorySku = data => {
  return axios.request({
    url: "api/InventoryQuery/ExportInventorySku",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 出库列表
export const getOutStockList = data => {
  return axios.request({
    url: "api/OrderReport/getOutStockList",
    method: "POST",
    data
  });
};

export const exportOutStockList = data => {
  return axios.request({
    url: "api/OrderReport/exportOutStockList",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// 发帘发块销量
export const HairWeftBlockSaleReport = data => {
  return axios.request({
    url: "api/OrderReport/HairWeftBlockSaleReport",
    method: "POST",
    data
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

/* 2020 / 07 / 30
weihuiying
退货退款报表 */
// 退货退款报表
export const ReturnOrderReport = data => {
  return axios.request({
    url: "api/OrderReport/OrderReturnOrderReport",
    method: "POST",
    data
  });
};
// 导出
export const exportReturnOrderReport = data => {
  return axios.request({
    url: "api/OrderReport/ExportOrderReturnOrderReport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

/* 2020 / 08/ 26
weihuiying
亚马逊库存报表 */
export const amazonInventory = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/report/amazon_inventory_statistics/" + urlData,
    method: "GET"
  });
};

/* 2020 / 08/ 28
weihuiying
亚马逊库存报表导出*/
export const exportAmazonInventory = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url:
      "/log/report/amazon_inventory_statistics/download_amazon_excel/" +
      urlData,
    method: "GET",
    responseType: "blob"
  });
};

/* 2020 / 09/ 09
weihuiying
三方仓库外部SKU成本*/

export const ThreeWareSkuQuery = data => {
  return axios.request({
    url: "api/FinancialStatement/ThreeWareSkuQuery",
    method: "POST",
    data
  });
};
// 导出
export const exportThreeWareSkuQuery = data => {
  return axios.request({
    url: "api/FinancialStatement/ThreeWareSkuQueryExport",
    method: "POST",
    data,
    responseType: "blob"
  });
};

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

/* 2020 / 10/ 06
weihuiying
国内海外仓发货占比*/

export const GetQueryInOut = data => {
  return axios.request({
    url: "/newApi/queryInOut/getList/",
    method: "POST",
    data
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

/* 2020 / 11/ 16
weihuiying
E贸易9610*/

// 订单列表
export const SaleOrderList = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/e_trade/sale_order/" + urlData,
    method: "GET"
  });
};
