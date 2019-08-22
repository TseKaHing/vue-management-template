import axios from './index'

export const authenByGithub = () => {
  return axios.request({
    url: '/authen/github',
    method: 'get'
  })
}