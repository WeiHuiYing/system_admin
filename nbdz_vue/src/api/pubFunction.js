import axios from '@/libs/api.request'


// 获取资源权限
export const getList = (id) => {
  return axios.request({
    url: 'api/Permission/GetList/'+id,
    method: 'get'
  })
}

//添加
export const Add=(data)=>{
  return axios.request({
    url: 'api/Permission/Add',
    data,
    method: 'post'
  })
}

//修改
export const Edit=(data)=>{
  return axios.request({
    url: 'api/Permission/Edit',
    data,
    method: 'post'
  })
}

//删除
export const Delete=(id)=>{
  return axios.request({
    url: 'api/Permission/Delete/'+id,
    method: 'post'
  })
}