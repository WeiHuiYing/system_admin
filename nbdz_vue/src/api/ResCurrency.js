import axios from '@/libs/api.request'
// 获取列表
export const getCurrency = (data) => {
  return axios.request({
    url: 'api/UploadShippingFee/getCurrency',
    method: 'POST',
    data
  })
}
// 编辑
export const editCurrency = (data) => {
  return axios.request({
    url: 'api/UploadShippingFee/editCurrency',
    method: 'POST',
    data
  })
}
// 添加
export const addCurrency = (data) => {
  return axios.request({
    url: 'api/UploadShippingFee/addCurrency',
    method: 'POST',
    data
  })
}
