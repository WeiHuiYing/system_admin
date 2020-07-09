import axios from '@/libs/api.request'

export const getCurrency = (data) => {
  return axios.request({
    url: 'api/UploadShippingFee/getCurrency',
    method: 'POST',
    data
  })
}
export const getCurrency = () => {
  return axios.request({
    url: 'api/UploadShippingFee/getCurrency',
    method: 'POST'
  })
}
