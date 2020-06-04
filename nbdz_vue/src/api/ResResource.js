import axios from '@/libs/api.request'

//获取列表
export const getPage = (data) => {
  return axios.request({
    url: 'api/ResResource/GetPage',
    data: data,
    method: 'post'
  })
}

//获取列表
export const getList = (data) => {
  return axios.request({
    url: 'api/ResResource/GetList',
    data: data,
    method: 'post'
  })
}

//获取单个id
export const Get = (data) => {
  return axios.request({
    url: 'api/ResResource/Get',
    data,
    method: 'post'
  })

}

//添加
export const Add = (data) => {
  return axios.request({
    url: 'api/ResResource/Add',
    data,
    method: 'post'
  })
}

//修改
export const Edit = (data) => {
  return axios.request({
    url: 'api/ResResource/Edit',
    data,
    method: 'post'
  })
}

//删除
export const Delete = (id) => {
  return axios.request({
    url: 'api/ResResource/Delete/' + id,
    method: 'post'
  })
}
