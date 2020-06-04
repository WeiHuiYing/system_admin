import request from '@/utils/request';
export async function AccountLogin(params) {
  return request('/api/Authroize', {
    method: 'POST',
    data: params,
  });
}
export async function GetAccess() {
  return request(`/api/User/GetAccess`, {
    method: 'Get',
  });
}
