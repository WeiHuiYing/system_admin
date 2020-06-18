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

// 获取财务汇总报表  商品类型列表
export async function GetProductCategoryList() {
  return request('/api/TotalSale/GetProductCategoryList', {
    method: 'POST',
  });
}
