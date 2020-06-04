import request from '@/utils/request';
export async function GetPage(params) {
  return request('/api/SingleSalesAnalysis/GetPage', {
    method: 'POST',
    data: params,
  });
}
