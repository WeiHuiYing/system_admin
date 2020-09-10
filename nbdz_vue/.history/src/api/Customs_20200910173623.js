import axios from "@/libs/api.request";


// 商品海关编码维护
export const productCode = (data, method) => {
  if (method == "Get") {
    let urlData = '?';
    Object.keys(data).forEach(key => {
      if (data[key] && data[key] != '') {
        urlData += key + '=' + data[key] + '&'
      }
    })
    urlData = urlData.substring(0, urlData.lastIndexOf('&'));
    return axios.request({
      url: "/log/e_trade/product" + urlData,
      method: method,
    });
  } else if (method == "Patch") {
    return axios.request({
      url: "/log/e_trade/product/" + data.id + "/",
      method: method,
      data: data
    });
  }
};


export const hscodeModel = (data, method) => {
  let urlData = '?';
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != '') {
      urlData += key + '=' + data[key] + '&'
    }
  })
  urlData = urlData.substring(0, urlData.lastIndexOf('&'));
  return axios.request({
    url: "/log/e_trade/product_hscode_model/" + urlData,
    method: method,
  });
};


//  海关编码维护
export const hsCode = (data, method, id) => {
  if (method == "Get") {
    if (id) {
      return axios.request({
        url: "/log/e_trade/product_hscode/" + id + "/",
        method: method,
      });
    } else {
      let urlData = '?';
      Object.keys(data).forEach(key => {
        if (data[key] && data[key] != '') {
          urlData += key + '=' + data[key] + '&'
        }
      })
      urlData = urlData.substring(0, urlData.lastIndexOf('&'));
      return axios.request({
        url: "/log/e_trade/product_hscode/" + urlData,
        method: method,
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
      method: method,
    });
  }
};


export const orderGroup = (data, method) => {
  return axios.request({
    url: "/log/e_trade/order_line_group/" + data.id + "/",
    method: method,
    data: data
  });
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
