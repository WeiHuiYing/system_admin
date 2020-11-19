/* 
  汇率管理
  e贸易账户列表
*/

import axios from '@/libs/api.request'
// 获取列表
export const getCurrency = (data) => {
  return axios.request({
    url: '/newApi/currency/getList',
    method: 'POST',
    data
  })
}
// 编辑
export const editCurrency = (data) => {
  return axios.request({
    url: '/newApi/currency/edit',
    method: 'POST',
    data
  })
}
// 添加
export const addCurrency = (data) => {
  return axios.request({
    url: '/newApi/currency/add',
    method: 'POST',
    data
  })
}
// 导入
export const uploadCurrency = (data, params) => {let urlData = '?';
Object.keys(params).forEach(key => {
  if (params[key] && params[key] != '') {
    urlData += key + '=' + params[key] + '&'
  }
})
urlData = urlData.substring(0, urlData.lastIndexOf('&'));
  return axios.request({
    url: '/newApi/currency/upload'+urlData,
    method: 'POST',
    responseType: "blob",
    data
  })
}
// E贸易账户列表
export const getEAccount = (data) => {
  let urlData = '?';
  Object.keys(data).forEach(key => {
    if (data[key] && data[key] != '') {
      urlData += key + '=' + data[key] + '&'
    }
  })
  urlData = urlData.substring(0, urlData.lastIndexOf('&'));
  return axios.request({
    url: "/log/e_trade/e_trade_account/" + urlData,
    method: "GET",
  });

};
