import axios from "@/libs/api.request";


// 物流方式
export const trackingCode = (data, method) => {
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
