import request from '@/utils/request';
// 获取仓库列表
export async function GetList(params) {
  return request('/api/ECWarehouse/GetList', {
    method: 'POST',
    data: params,
  });
}
// 获取单个仓库信息
export async function Get(params) {
  return request('/api/ECWarehouse/Get', {
    method: 'POST',
    data: params,
  });
}
