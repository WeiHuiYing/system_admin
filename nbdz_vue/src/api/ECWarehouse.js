import axios from '@/libs/api.request'


// 列表
export const getList = (data) => {
  return axios.request({
    url: 'api/ECWarehouse/GetList/',
    method: 'POST',
    data,
  })
}

// 详情
export const Get = (data) => {
  return axios.request({
    url: 'api/ECWarehouse/Get/',
    method: 'POST',
    data,
  })
}
