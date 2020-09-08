import axios from "@/libs/api.request";


// 商品海关编码维护
export const productCode = (data, method) => {
  let urlData = '?';
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != '') {
      urlData += key + '=' + data[key] + '&'
    }
  })
  urlData = urlData.substring(0, urlData.lastIndexOf('&'));
  return axios.request({
    url: "/log/e_trade/product/ " + urlData,
    method: method,
  });
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
      data:data
    });
  } else if (method == "Post") {
    return axios.request({
      url: "/log/e_trade/product_hscode/",
      method: method,
      data:data
    });
  }else if (method == "Delete") {
    return axios.request({
      url: "/log/e_trade/product_hscode/"+ data.id + "/",
      method: method,
    });
  }
};
