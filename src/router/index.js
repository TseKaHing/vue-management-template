import Vue from 'vue'
import Router from 'vue-router'
import { routes } from './router'
import store from '@/store'
import { setTitle, setToken, getToken, localSave } from '@/lib/util'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

// const HAS_LOGINED = false

var addRoutesFlag = false

router.beforeEach((to, from, next) => {
  to.meta && setTitle(to.meta.title)
  const token = getToken()
  // 有token
  if (token) {
    addRoutesFlag = !store.state.router.hasGetRules
    // 未获取主页的路由规则
    if (addRoutesFlag) {
      store.dispatch('authorization').then(rules => {
        store.dispatch('concatRoutes', rules).then(routers => {
          router.addRoutes(routers)
          next({ ...to, replace: true })
        }).catch(() => {
          next({ name: 'login' })
        })
      }).catch(() => {
        setToken('')
        localSave('tabList', `[]`)
        next({ name: 'login' })
      })
    }
    // 已经获取主页的路由规则 
    else {
      if (to.name === 'login') {
        localSave('tabList', `[]`)
        next({ name: 'home' })
      }
      else next()
    }
  } else {
    // 无token
    if (to.name === 'login' || to.name === 'authenbygithub' || to.name === 'authentest' || to.name === "register") next()
    else next({ name: 'login' })
  }
})

// router.beforeResolve

router.afterEach((to, from) => {
  // logining = false
})

/**
 * 1. 导航被触发
 * 2. 在失活的组件（即将离开的页面组件）里调用离开守卫 beforeRouteLeave
 * 3. 调用全局的前置守卫 beforeEach
 * 4. 在重用的组件里调用 beforeRouteUpdate
 * 5. 调用路由独享的守卫 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活的组件（即将进入的页面组件）里调用 beforeRouteEnter
 * 8. 调用全局的解析守卫 beforeResolve
 * 9. 导航被确认
 * 10. 调用全局的后置守卫 afterEach
 * 11. 触发DOM更新
 * 12. 用创建好的实例调用beforeRouterEnter守卫里传给next的回调函数
 */

export default router
