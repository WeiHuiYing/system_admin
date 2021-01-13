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
