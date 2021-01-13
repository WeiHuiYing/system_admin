// 公共报表
import axios from "@/libs/api.request";

// baseSet

//  海关编码维护
export const hsCode = (data, method, id) => {
  if (method == "Get") {
    if (id) {
      return axios.request({
        url: "/log/e_trade/product_hscode/" + id + "/",
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
        url: "/log/e_trade/product_hscode/" + urlData,
        method: method
      });
    }
  } else if (method == "Patch") {
    return axios.request({
      url: "/log/e_trade/product_hscode/" + data.id + "/",
      method: method,
      data: data
    });
  } else if (method == "Post") {
    return axios.request({
      url: "/log/e_trade/product_hscode/",
      method: method,
      data: data
    });
  } else if (method == "Delete") {
    return axios.request({
      url: "/log/e_trade/product_hscode/" + data.id + "/",
      method: method
    });
  }
};

export const hscodeModel = (data, method) => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/e_trade/product_hscode_model/" + urlData,
    method: method
  });
};

// 商品海关编码维护
export const productCode = (data, method) => {
  if (method == "Get") {
    let urlData = "?";
    Object.keys(data).forEach(key => {
      if (data[key] && data[key] != "") {
        urlData += key + "=" + data[key] + "&";
      }
    });
    urlData = urlData.substring(0, urlData.lastIndexOf("&"));
    return axios.request({
      url: "/log/e_trade/product/" + urlData,
      method: method
    });
  } else if (method == "Patch") {
    return axios.request({
      url: "/log/e_trade/product/" + data.id + "/",
      method: method,
      data: data
    });
  }
};
// 上传商品海关编码
export const uploadHsCode = (data, method) => {
  return axios.request({
    url: "/log/e_trade/product_hscode/upload_hs_code/",
    method: method,
    processData: false,
    data: data
  });
};

// 物流方式
export const trackingCode = (data, method) => {
  if (method == "GET") {
    return axios.request({
      url:
        "/log/logistics/trackingCode/?page=" +
        data.page +
        "&page_size=" +
        data.pageSize +
        "&search=" +
        data.search,
      method: method
    });
  } else if (method == "PUT") {
    return axios.request({
      url: "/log/logistics/trackingCode/" + data.id + "/",
      method: method,
      data
    });
  } else if (method == "DELETE") {
    return axios.request({
      url: "/log/logistics/trackingCode/" + data.id + "/",
      method: method
    });
  } else if (method == "POST") {
    return axios.request({
      url: "/log/logistics/trackingCode/",
      method: method,
      data
    });
  }
};

// Cost

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
// Declare

export const orderGroup = (data, method) => {
  return axios.request({
    url: "/log/e_trade/order_line_group/" + data.id + "/",
    method: method,
    data: data
  });
};
// E贸易9610订单列表 详情
export const SaleOrder9610 = data => {
  let url;
  if (data.id) {
    url = `/log/e_trade/order9610/${data.id}/`;
    delete data.id;
  } else {
    url = `/log/e_trade/order9610/`;
  }
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));

  return axios.request({
    url: url + urlData,
    method: "GET"
  });
};
// e贸易9610订单提交

export const confirmSubmit9610 = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/e_trade/order9610/batch_confirm_submit/" + urlData,
    method: "POST"
  });
};
// e贸易9610订单取消
export const confirmRepeal9610 = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/e_trade/order9610/batch_confirm_repeal/" + urlData,
    method: "POST"
  });
};

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
// 拉取订单
export const getOrderData = () => {
  return axios.request({
    url: "/log/e_trade/ship_batch/download_order/",
    method: "GET"
  });
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

// Logistics
// 物流时效报表
export const agingReport = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/logistics/order/logistics_aging_report/" + urlData,
    method: "GET"
  });
};
// 订单物流批量查询
export const batchOrder = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/logistics/trackingInfo/" + urlData,
    method: "GET"
  });
};

// 订单物流批量查询  导出
export const exportBatchOrder = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/logistics/trackingInfo/download_excel/" + urlData,
    method: "GET"
  });
};

/* 物流到达情况表
2020 / 10 / 30
 weihuiying */
export const LogisticsEfficiency = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/logistics/order/get_logistics_efficiency_report/" + urlData,
    method: "GET"
  });
};

// 订单物流查询
export const order = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/logistics/order/" + urlData,
    method: "GET"
  });
};

// 导出物流查询结果
export const exportOrder = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/logistics/order/download_logistics_excel/" + urlData,
    method: "GET",
    responseType: "blob"
  });
};

// Sales

/*  
  废弃订单
  20200805
  weihuiying 
*/
export const CancelOrderReport = data => {
  return axios.request({
    url: "/newApi/cancelOrder/getList",
    method: "POST",
    data
  });
};
export const ExportCancelOrderReport = data => {
  return axios.request({
    url: "/newApi/cancelOrder/exportCancelOrder",
    method: "POST",
    data,
    responseType: "blob"
  });
};

// 综合站发货时效报表
export const ComplexDeliver = data => {
  return axios.request({
    url: "api/OrderReport/JurllysheDeliveryTimeLimitReport",
    method: "POST",
    data
  });
};
