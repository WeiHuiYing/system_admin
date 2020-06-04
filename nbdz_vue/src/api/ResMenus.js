import axios from '@/libs/api.request'

export const getList = () => {
  return axios.request({
    url: 'api/ResMenus/GetMenus',
    method: 'get'
  })
}

export const addMenus = (data) => {
  return axios.request({
    url: 'api/ResMenus/AddMenus',
    data: data,
    method: 'post'
  })
}

export const editMenus = (data) => {
  return axios.request({
    url: 'api/ResMenus/EditMenu',
    data: data,
    method: 'post'
  })
}

export const deleteMenus = (id) => {
  return axios.request({
    url: 'api/ResMenus/DeleteMenu?id=' + id,
    method: 'post'
  })
}
