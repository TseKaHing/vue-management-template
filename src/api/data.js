import axios from './index'
export const getTableData = () => {
  return axios.request({
    url: '/data/gettabledata',
    method: 'get'
  })
}