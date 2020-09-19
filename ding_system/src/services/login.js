import request from '@/utils/request';
import qs from 'qs'
export async function AccountLogin(params) {
  return request('/login/connect/token', {
    method: 'POST',
    data: qs.stringify(params),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
}
export async function GetAccess(data) {
  return request(`/login/connect/userinfo`, {
    method: 'Get',
    data
  });
}
