import request from '@/utils/request';
import Form from 'antd/lib/form/Form';
// 获取分类列表
export async function GetTypes(params) {
  return request('/api/DingTalkNews/GetTypes', {
    method: 'POST',
    data: params,
  });
}
// 获取新闻列表
export async function GetNews(params) {
  if (params.id) {
    return request(`/api/DingTalkNews/GetNews?id=` + params.id, {
      method: 'POST',
      data: params.data,
    });
  } else {
    return request(`/api/DingTalkNews/GetNews`, {
      method: 'POST',
      data: params.data,
    });
  }
}
// 新闻详情
export async function GetNew(id) {
  return request(`/api/DingTalkNews/GetNew?id=` + id, {
    method: 'POST',
  });
}
// 创建新闻
export async function addNews(params) {
  return request(`/api/DingTalkNews/addNews?classifyId=` + params.cateId, {
    method: 'POST',
    data: params.data,
  });
}

// 更新新闻
export async function editNew(params) {
  return request(`/api/DingTalkNews/editNew?classifyId=` + params.cateId, {
    method: 'POST',
    data: params.data,
  });
}

// 上传图片

export async function picUpload(data) {
  return request(`/api/DingTalkNews/picUpload`, {
    method: 'POST',
    processData: false,

    data: data,
  });
}
// 创建分类
export async function addTypes(params) {
  return request(`/api/DingTalkNews/addTypes`, {
    method: 'POST',
    data: params,
  });
}
// 更新分类
export async function updateTypes(params) {
  return request(`/api/DingTalkNews/updateTypes`, {
    method: 'POST',
    data: params,
  });
}

// 删除分类
export async function deleteTypes(id) {
  return request(`/api/DingTalkNews/deleteTypes?id=` + id, {
    method: 'POST',
  });
}
