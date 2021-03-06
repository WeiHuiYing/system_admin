import axios from "@/libs/api.request";

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

// 周发货时效报表
export const weeklyDelivery = data => {
  let urlData = "?";
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != "") {
      urlData += key + "=" + data[key] + "&";
    }
  });
  urlData = urlData.substring(0, urlData.lastIndexOf("&"));
  return axios.request({
    url: "/log/logistics/order/get_logistics_zhz_report/" + urlData,
    method: "GET"
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
