import Cookies from 'js-cookie'
import { doCustomTimes, objEqual } from '../lib/tools'

export const setTitle = title => {
  window.document.title = title || "ThinkBig"
}

export const setToken = (token, tokenName = 'token') => {
  Cookies.set(tokenName, token)
}

export const getToken = (tokenName = 'token') => {
  return Cookies.get(tokenName)
}

export const setUserInfo = (_id, username, password, degree) => {
  Cookies.set('_id', _id)
  Cookies.set('username', username)
  Cookies.set('password', password)
  Cookies.set('degree', degree)
}

export const setCodeFromGithub = (code, codeName = 'codeFromGithub') => {
  Cookies.set(codeName, code)
}

export const getCodeFromGithub = (codeName = 'codeFromGithub') => {
  return Cookies.get(codeName)
  // console.log(codeName, Cookies.get(codeName));
}

export const setRawPwd = (raw_pwd) => {
  Cookies.set('rawpwd', raw_pwd)
}

export const getRawPwd = () => {
  return Cookies.get('rawpwd')
}

export const getUserId = () => {
  return Cookies.get('_id')
}

export const getUserName = () => {
  return Cookies.get('username')
}

export const getPassword = () => {
  return Cookies.get('password')
}

export const getUserDegree = () => {
  return Cookies.get('degree')
}

export const localSave = (name, value) => {
  localStorage.setItem(name, value)
}

export const localRead = (name) => {
  return localStorage.getItem(name)
}

export const getOpenArrByName = (name, routerList) => {
  let arr = []
  routerList.some(item => {
    if (item.name === name) {
      arr.push(item.name)
      return true
    }
    if (item.children && item.children.length) {
      let childArr = getOpenArrByName(name, item.children)
      if (childArr.length) {
        arr = arr.concat(item.name, childArr)
        return true
      }
    }
  })
  return arr
}


export const routeEqual = (route1, route2) => {
  // const { name1, params1, query1 } = route1
  // const { name2, params2, query2 } = route2
  if (route1 == undefined || route2 == undefined) {
    return false
  }
  let params1 = route1.params
  let params2 = route2.params
  let query1 = route1.query1
  let query2 = route2.query2
  if (!params1) params1 = {}
  if (!params2) params2 = {}
  if (!query1) query1 = {}
  if (!query2) query2 = {}

  // const params1 = route1.params || {}
  // const params2 = route2.params || {}
  // const query1 = route1.query || {}
  // const query2 = route2.query || {}
  return route1.name === route2.name && objEqual(params1, params2) && objEqual(query1, query2)
}

export const routeHasExist = (tabList, routeItem) => {
  if (routeItem.meta.title == '404') {
    return true
  }
  let len = tabList.length
  let exist = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tabList[index], routeItem)) exist = true
  })
  console.log('exist：', exist);
  return exist
}

const getKeyValueArr = obj => {
  let arr = []
  Object.entries(obj).sort((a, b) => {
    return a[0] - b[0]
  }).forEach(([_key, _val]) => {
    arr.push(_key, _val)
  })
  return arr
}

export const getTabNameByRoute = route => {
  const { name, params, query } = route
  let res = name
  if (params && Object.keys(params).length) res += ':' + getKeyValueArr(params).join('_')
  if (query && Object.keys(query).length) res += '&' + getKeyValueArr(query).join('_')
  return res
}

const getObjBySplitStr = (id, splitStr) => {
  let splitArr = id.split(splitStr)
  let str = splitArr[splitArr.length - 1]
  let keyValArr = str.split('_')
  let res = {}
  let i = 0
  let len = keyValArr.length
  while (i < len) {
    res[keyValArr[i]] = keyValArr[i + 1]
    i += 2
  }
  return res
}

export const getRouteById = id => {
  let res = {}
  if (id.includes('&')) {
    res.query = getObjBySplitStr(id, '&')
    id = id.split('&')[0]
  }
  if (id.includes(':')) {
    res.params = getObjBySplitStr(id, ':')
    id = id.split(':')[0]
  }
  res.name = id
  return res
}