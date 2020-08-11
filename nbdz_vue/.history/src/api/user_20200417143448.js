import axios from '@/libs/api.request'

export const login = ({
  userName,
  password
}) => {
  const data = {
    Name: userName,
    Password: password
  }
  return axios.request({
    url: 'api/Authroize',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'api/User/GetAccess',
    method: 'get'
  })
}
