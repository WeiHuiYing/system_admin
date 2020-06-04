import axios from '@/libs/api.request'

// 查询数据
export const GetPage = (data) => {
  return axios.request({
    url: 'api/Schedule/GetPage',
    data,
    method: 'post'
  })
}
// 添加任务
export const Add = (data) => {
    return axios.request({
      url: 'api/Schedule/Add',
      data,
      method: 'post'
    })
}

// 修改任务
export const Edit = (data) => {
    return axios.request({
      url: 'api/Schedule/Edit',
      data,
      method: 'post'
    })
}

// 执行任务
export const Excute=(id)=>{
    return axios.request({
      url: 'api/Schedule/Excute/'+id,
      method: 'post'
    })
}
// 停止任务
export const Stop=(id)=>{
    return axios.request({
      url: 'api/Schedule/Stop/'+id,
      method: 'post'
    })
}
// 恢复暂停任务
export const Resume=(id)=>{
    return axios.request({
      url: 'api/Schedule/Resume/'+id,
      method: 'post'
    })
}
//删除任务
export const Delete=(id)=>{
    return axios.request({
      url: 'api/Schedule/Delete/'+id,
      method: 'post'
    })
}