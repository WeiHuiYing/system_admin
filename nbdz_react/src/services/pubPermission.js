import request from '@/utils/request';
// 获取单个权限
export async function Get(id) {
  return request('/api/Permission/GetList/' + id, {
    method: 'Get',
  });
}
// 添加权限
export async function Add(params) {
  return request('/api/Permission/Add', {
    method: 'POST',
    data: params,
  });
}

// 编辑权限
export async function Edit(params) {
  return request('/api/Permission/Edit', {
    method: 'POST',
    data: params,
  });
}

// 删除权限
export async function Delete(id) {
  return request('/api/Permission/Delete/' + id, {
    method: 'POST',
  });
}
