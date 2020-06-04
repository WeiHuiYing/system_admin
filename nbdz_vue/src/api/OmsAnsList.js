import axios from '@/libs/api.request'

// OmsAnsList
export const getList = (data) => {
  return axios.request({
    url: 'api/OmsAnsList/GetList',
    method: 'POST',
    data,
  })
}


// 添加
export const Add = (data) => {
  return axios.request({
    url: 'api/OmsAnsList/AddRecivingCode',
    method: 'POST',
    data
  })
}

// 获取单个数据
export const getDetails = (id) => {
  return axios.request({
    url: 'api/OmsAnsList/GetDetails?id=' + id,
    method: 'POST',
  })
}
