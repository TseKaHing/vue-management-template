import { routeHasExist, getRouteById, routeEqual, localSave, localRead } from '@/lib/util'
import { Message } from 'iview'

const state = {
  // tabList: JSON.parse(localRead('tabList') || "[]"),
  tabList: JSON.parse(localRead('tabList') || `[]`)

}

const getTabListToLocal = tabList => {
  return tabList.map(item => {
    return {
      name: item.name,
      path: item.path,
      meta: item.meta,
      params: item.params,
      query: item.query
    }
  })
}

const mutations = {
  UPDATE_ROUTER(state, route) {
    // if (!routeHasExist(state.tabList, route) && route.name !== 'login' && route.name !== 'pwdsuccess' && route.name !== 'authenbygithub') {
    //   state.tabList.push(route)
    // }
    if (!routeHasExist(state.tabList, route) && route.name !== 'login' && route.name !== 'pwdsuccess' && route.name !== 'authentest' && route.name !== 'authenbygithub') {
      state.tabList.push(route)
    }
    localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  },
  REMOVE_TAB(state, index) {

    if (index < 0 || !state.tabList[index].meta.title) {
      state.tabList.splice(index, 1)
      localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
    }
    if (state.tabList.length == 1 && state.tabList[index].name == 'homepage') {
      const homepage_route = state.tabList[index]
      state.tabList.splice(index, 1)
      state.tabList.push(homepage_route)
      localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
      Message.info("'" + homepage_route.meta.title + "'" + "不能被关闭！")
    } else {
      state.tabList.splice(index, 1)
      localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
    }


    // state.tabList.splice(index, 1)
    // localSave('tabList', JSON.stringify(getTabListToLocal(state.tabList)))
  }
}

const actions = {
  handleRemove({ commit }, { id, $route }) {
    return new Promise((resolve) => {
      let route = getRouteById(id)
      let index = state.tabList.findIndex(item => {
        return routeEqual(route, item)
      })
      // 关闭后，跳转到另一页
      let len = state.tabList.length


      let nextRoute = {}
      if (routeEqual($route, state.tabList[index])) {
        if (index < len - 1) nextRoute = state.tabList[index + 1]
        else nextRoute = state.tabList[index - 1]
      }
      const { name, params, query } = nextRoute || { name: 'homepage' }
      commit('REMOVE_TAB', index)
      resolve({
        name, params, query
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}