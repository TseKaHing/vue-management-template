import Layout from '../views/layout/Layout.vue'

// routerMap 里面存的是需要token权限的路由
export const routerMap = [
  {
    path: '/home',
    name: 'home',
    redirect: '/home/homepage',
    component: Layout,
    meta: {
      index: 1,
      title: '首页',
      icon: "ios-home"
    },
    children: [
      {
        path: 'homepage',
        name: 'homepage',
        component: () => import('@/views/homepage'),
        meta: { index: 2, title: '主页数据展示', icon: 'md-stats' }
      },
      {
        path: '/demo',
        name: 'getUserInfo_demo',
        component: () => import('@/views/getUserInfo_demo.vue'),
        meta: { index: 2, title: 'demo', icon: "ios-folder-open" }
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test.vue'),
        meta: { index: 2, title: 'test', icon: "logo-javascript" }
      },
    ]
  },

  {
    path: '/settings',
    name: 'settings',
    component: Layout,
    // redirect: '/login/main/personalsettings/changepwd',
    // component: () => import('@/views/personalsettings/Personal-settings.vue'),
    meta: { index: 1, title: '系统设置', icon: "md-settings" },
    children: [
      {
        path: 'personalSettings',
        name: 'personalSettings',
        component: () => import('@/views/personalsettings/Personal-settings.vue'),
        meta: { index: 2, title: '个人设置', icon: 'md-person' },
        children: [
          {
            path: 'changepwd',
            name: 'changepwd',
            component: () => import("@/views/personalsettings/Change-password.vue"),
            meta: { index: 3, title: '修改密码', icon: 'md-lock' }
          },
          {
            path: 'resetpwdbyemail',
            name: 'resetpwdbyemail',
            component: () => import("@/views/personalsettings/ResetPwdByEmail.vue"),
            meta: { index: 3, title: '重置密码', icon: 'md-refresh' }
          }
        ]
      }
    ]

  },

]
// routes 里面存的是不需要token权限的路由
export const routes = [
  // {
  //   path: '/',
  //   redirect: '/login'
  // },
  // {
  //   path: '/',
  //   name: 'login_demo',
  //   component: () => import('@/views/login_demo.vue'),
  //   meta: { title: '登录demo', icon: 'md-log-in' }
  // },

  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/Login.vue'),

    meta: { index: 0, title: '登录' }
  },
  {
    path: 'pwdsuccess',
    name: 'pwdsuccess',
    component: () => import("@/views/personalsettings/Change_Password_Success.vue"),
    meta: { index: 0, title: '修改成功', icon: 'md-checkmark-circle' }
  },
  {
    path: '*',
    component: () => import('@/views/common/404.vue'),
    meta: { index: 0 }
  }
]