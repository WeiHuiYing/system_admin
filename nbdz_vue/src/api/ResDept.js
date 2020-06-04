import axios from '@/libs/api.request'


export const getList = (data) => {
  return axios.request({
    url: 'api/ResDept/GetList',
    data: data,
    method: 'post'
  })
}

//获取子部门
export const getChildList = (id) => {
  return axios.request({
    url: 'api/ResDept/GetChildList/' + id,
    method: 'post'
  })
}

//添加
export const Add = (model) => {
  const data = model;
  return axios.request({
    url: 'api/ResDept/Add',
    data,
    method: 'post'
  })
}

//修改
export const Edit = (model) => {
  const data = model;
  return axios.request({
    url: 'api/ResDept/Edit',
    data,
    method: 'post'
  })
}

//删除
export const Delete = (id) => {
  return axios.request({
    url: 'api/ResDept/Delete/' + id,
    method: 'post'
  })
}

//获取详情
export const Get = (data) => {
  return axios.request({
    url: 'api/ResDept/Get',
    data,
    method: 'post'
  })
}
