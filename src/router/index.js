import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const _import = require("./import-" + process.env.NODE_ENV);

const gloabalRoutes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: _import('login/Login')
  },
  {
    path: '/test',
    name: 'test',
    component: _import('test')
  },
  {
    path: '*',
    name: '404',
    component: _import('common/404')
  },
]

const commonRoutes = [
  {
    path: '/login/main',
    name: 'main',
    component: _import('layout/Layout'),
    // 在进入main页面的时候需要判断头部是否带有token
    beforeEnter: (to, from, next) => {
      const token = Lockr.get('token')
      if (token) {
        next()
      }
      else {
        // console.log('您尚未登录哦~请乖乖登录鸭')
        router.replace({ name: 'login' })
        next(false)
      }
    },
    children: [
      {
        path: 'personalsettings',
        name: 'personalsettings',
        redirect: '/login/main/personalsettings/changepwd',
        component: _import('personalsettings/Personal-settings'),
        children: [
          {
            path: 'changepwd',
            name: 'changepwd',
            component: _import("personalsettings/Change-password"),
            meta: { title: "修改密码" }
          },
          {
            path: 'pwdsuccess',
            name: 'pwdsuccess',
            component: _import("personalsettings/Change_Password_Success"),
            meta: { title: "修改成功" }
          },
          {
            path: 'resetpwdbyemail',
            name: 'resetpwdbyemail',
            component: _import("personalsettings/ResetPwdByEmail")
          }
        ]
      }
    ]
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: gloabalRoutes.concat(commonRoutes)

})



export default router
