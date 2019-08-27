import axios from './index'

export const authenByGithub = () => {
  return axios.request({
    url: '/authen/github',
    method: 'get'
  })
}

export const getAccessToken = ({ access_token }) => {
  return axios.request({
    url: '/authen/access_token',
    method: 'post',
    data: {
      access_token
    }
  })
}

// export const 