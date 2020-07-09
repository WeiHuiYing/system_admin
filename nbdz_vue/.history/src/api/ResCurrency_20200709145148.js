import axios from '@/libs/api.request'

export const getCurrency = (data) => {
  return axios.request({
    url: 'api/UploadShippingFee/getCurrency',
    method: 'POST',
    data
  })
}
export const editCurrency = (data) => {
  return axios.request({
    url: 'api/UploadShippingFee/editCurrency',
    method: 'POST',
    data
  })
}
export const addCurrency = (data) => {
  return axios.request({
    url: 'api/UploadShippingFee/addCurrency',
    method: 'POST',
    data
  })
}
