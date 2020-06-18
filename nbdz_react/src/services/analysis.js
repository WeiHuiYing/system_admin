import request from '@/utils/request';
// 销售报表
export async function SalesGetPage(params) {
  return request('/api/SingleSalesAnalysis/GetPage', {
    method: 'POST',
    data: params,
  });
}

// 销售汇总报表
export async function TotalSale(params) {
  return request('/api/TotalSale', {
    method: 'POST',
    data: params,
  });
}
// 发帘发块分产品尺寸销售占比
export async function GetWeavingBlock(params) {
  return request('/api/SaleOrderReport/GetWeavingBlock', {
    method: 'POST',
    data: params,
  });
}
// 头套产品销售明细
export async function GetDensity(params) {
  return request('/api/SaleOrderReport/GetDensity', {
    method: 'POST',
    data: params,
  });
}
// 单条订单与多条订单对比
export async function GetOddMinusSale(params) {
  return request('/api/SaleOrderReport/GetOddMinusSale', {
    method: 'POST',
    data: params,
  });
}
// 各店铺各等级产品销量汇总
export async function ChannelLevelSalesCount(params) {
  return request('/api/ChannelLevelSalesCount/index', {
    method: 'POST',
    data: params,
  });
}
// 发帘发块分款式销售占比
export async function HairWeftStyleSale(params) {
  return request('/api/HairWeftStyleSale', {
    method: 'POST',
    data: params,
  });
}
// 产品图片
