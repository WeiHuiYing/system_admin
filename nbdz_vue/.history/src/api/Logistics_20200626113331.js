import axios from "@/libs/api.request";


// 物流方式
export const trackingCode = (data, method) => {
  if (method == "GET") {
    return axios.request({
      url: "/log/logistics/trackingCode?page=" + data.page + '&page_size=' + data.pageSize + '&search=' + data.search,
      method: method,
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
      method: method,
    });
  } else if (method == "POST") {
    return axios.request({
      url: "/log/logistics/trackingCode/",
      method: method,
      data
    });
  }
};

// 订单物流查询
export const order = data => {
  let urlData = '?';
  Object.keys(data).forEach(key => {
    console.log(key)
    if (data[key] != '') {
      urlData += key + '=' + data[key] + '&'
    }
  })
  urlData = urlData.substring(0, basic.lastIndexOf('&'));
  return axios.request({
    url: "/log/logistics/order" + urlData,
    method: "GET",
    data
  });
};
