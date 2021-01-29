// Order
import axios from "@/libs/api.request";

// baseSet

// 物流信息配置
export const configLogistics = (data, method) => {
  if (method == "GET") {
    return axios.request({
      url: "/log/logistics/config/",
      method: method
    });
  } else if (method == "PUT") {
    return axios.request({
      url: "/log/logistics/config/" + data.id + "/",
      method: method,
      data
    });
  }
};

// 新品功能
// 添加新品
export const NewProductAdd = data => {
  return axios.request({
    url: "/newApi/product/add/",
    method: "POST",
    data
  });
};
// 编辑新品
export const NewProductEdit = data => {
  return axios.request({
    url: "/newApi/product/edit/",
    method: "POST",
    data
  });
};

// 批量停用
export const NewProductDisable = data => {
  return axios.request({
    url: "/newApi/product/disable",
    method: "POST",
    data
  });
};
// 获取列表
export const NewProductList = data => {
  return axios.request({
    url: "/newApi/product/getlist",
    method: "POST",
    data
  });
};

// 新品追踪报表
export const NewProductReport = data => {
  return axios.request({
    url: "/newApi/product/newProductReport",
    method: "POST",
    data
  });
};
// 新品追踪 导出
export const ExportNewProduct = data => {
  return axios.request({
    url: "/newApi/product/newProductReportExport",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// 上传新品
export const NewProductUpload = data => {
  return axios.request({
    url: "/newApi/product/upload",
    method: "POST",
    responseType: "blob",
    data
  });
};

// sales

// 各店铺各等级产品销量汇总
export const ChannelLevelSalesCount = data => {
  return axios.request({
    url: "api/ChannelLevelSalesCount/index",
    method: "POST",
    data
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

// 头套产品销售明细
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

// 发帘发块销量
export const HairWeftBlockSaleReport = data => {
  return axios.request({
    url: "api/OrderReport/HairWeftBlockSaleReport",
    method: "POST",
    data
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

// OmsAnsList
export const getOmsList = data => {
  return axios.request({
    url: "api/OmsAnsList/GetList",
    method: "POST",
    data
  });
};

// 添加
export const OmsAdd = data => {
  return axios.request({
    url: "api/OmsAnsList/AddRecivingCode",
    method: "POST",
    data
  });
};

// 获取单个数据
export const getOmsDetails = id => {
  return axios.request({
    url: "api/OmsAnsList/GetDetails?id=" + id,
    method: "POST"
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

/* 
2020 / 10 / 28
SKU销量明细报表
weihuiying */
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

// 发帘发块分产品尺寸销售占比
export const GetWeavingBlock = data => {
  return axios.request({
    url: "api/SaleOrderReport/GetWeavingBlock",
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

/*  
  大货报备报表
  20201117
  weihuiying 
*/
export const GetCountBatch = data => {
  return axios.request({
    url: "/newApi/inventory/getCountBatchList",
    method: "POST",
    data
  });
};
export const ExportCountBatch = data => {
  return axios.request({
    url: "/newApi/inventory/exportCountBatchList",
    method: "POST",
    data,
    responseType: "blob"
  });
};
// 大类列表

export const getProductType = data => {
  return axios.request({
    url: "/newApi/inventory/getProductType",
    method: "GET",
    data
  });
};

/*  
  现货不足4周报表
  20201117
  weihuiying 
*/
export const GetLess4WeekList = data => {
  return axios.request({
    url: "/newApi/inventory/getLess4WeekList",
    method: "POST",
    data
  });
};
export const ExportLess4WeekList = data => {
  return axios.request({
    url: "/newApi/inventory/exportLess4WeekList",
    method: "POST",
    data,
    responseType: "blob"
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

// 天猫
export const TmallSkuList = data => {
  return axios.request({
    url: "/newApi/tmall/getSkuSaleList",
    method: "POST",
    data
  });
};
export const ExportTmallSkuList = data => {
  return axios.request({
    url: "/newApi/tmall/exportSkuSaleList",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 国内海外仓发货占比(店铺)
export const storeQueryInOut = data => {
  return axios.request({
    url: "/newApi/order/storeQueryInOut",
    method: "POST",
    data
  });
};

// 產品品類對應預期天數維護
export const ProductForDays = data => {
  return axios.request({
    url: "/newApi/order/getOrderProductExpiryBaseList",
    method: "POST",
    data
  });
};
export const EditProductForDays = data => {
  return axios.request({
    url: "/newApi/order/editOrderProductExpiryBaseList",
    method: "POST",
    data
  });
};
