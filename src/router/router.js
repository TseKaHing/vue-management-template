import Layout from '../views/layout/Layout.vue'

// routerMap 里面存的是需要token权限的路由
export const routerMap = [
  {
    path: '/authenbygithub',
    name: 'authenbygithub',
    component: () => import('@/views/common/AuthenByGithub.vue'),
    meta: { index: 1, title: 'github授权', icon: 'logo-github' }
  },
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
        path: 'demo',
        name: 'getUserInfo_demo',
        component: () => import('@/views/getUserInfo_demo.vue'),
        meta: { index: 2, title: 'demo', icon: "ios-folder-open" }
      },
      {
        path: 'test',
        name: 'test',
        component: () => import('@/views/test.vue'),
        meta: { index: 2, title: 'test', icon: "logo-javascript" }
      },
    ]
  },


  {
    path: '/management',
    name: 'management',
    component: Layout,
    meta: { index: 1, title: '系统管理', icon: 'ios-settings' },
    children: [
      {
        path: 'user',
        name: 'user_manage',
        component: () => import('@/views/sys_management/user'),
        meta: { index: 2, title: '用户管理', icon: 'ios-person' }
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: Layout,
    meta: { index: 1, title: '个人信息', icon: "ios-build" },
    children: [

      {
        path: 'mine',
        name: 'mine',
        component: () => import("@/views/personalsettings/personalinfo"),
        meta: { index: 2, title: '我的主页', icon: "md-book" },
      },
      {
        path: 'personalSettings',
        name: 'personalSettings',
        component: () => import('@/views/personalsettings/Personal-settings.vue'),
        meta: { index: 2, title: '修改信息', icon: 'ios-person' },
        children: [
          {
            path: 'maininfo',
            name: 'maininfo',
            component: () => import("@/views/personalsettings/main"),
            meta: { index: 2, title: '个人资料', icon: "ios-browsers-outline" }
          },
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
  {
    path: '/ips',
    name: 'ips',
    component: Layout,
    meta: { index: 1, title: 'IP管理', icon: "md-globe" },
    children: [
      {
        path: 'fetch',
        name: 'fetch',
        component: () => import('_v/ips/fetch'),
        meta: { index: 2, title: '获取IP', icon: 'ios-download-outline' }
      },
      {
        path: 'check',
        name: 'check',
        component: () => import('_v/ips/check'),
        meta: { index: 2, title: '查询IP', icon: 'ios-checkmark-circle-outline' }
      }
    ]
  }
]
// routes 里面存的是不需要token权限的路由
export const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/login/Login.vue'),
    redirect: '/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/login/login-form.vue'),
        meta: { index: 0, title: '登录' }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/login/register-form.vue'),
        meta: { index: 0, title: '注册' }
      }

    ]
  },
  {
    path: '/authentest',
    name: 'authentest',
    component: () => import('@/views/at.vue'),
    meta: { index: 1, title: '授权测试', icon: "ios-heart" }
  },
  {
    path: '/authenbygithub',
    name: 'authenbygithub',
    component: () => import('@/views/common/AuthenByGithub.vue'),
    meta: { index: 1, title: 'github授权', icon: 'logo-github' }
  },
  {
    path: '/common',
    name: 'common',
    component: Layout,
    meta: { index: 1, title: '封装的组件', icon: 'md-git-compare' },
    children: [
      {
        path: '/commonselect',
        name: 'commonselect',
        component: () => import('_c/big-data/common_select/common_select.vue'),
        meta: { index: 2, title: '通用选择框', icon: 'ios-list-box-outline' }
      },
      {
        path: '/commontable',
        name: 'commontable',
        component: () => import('_c/big-data/common_table/common_table.vue'),
        meta: { index: 2, title: '通用表格', icon: 'md-bookmarks' }
      },
      {
        path: '/areadata',
        name: 'areadata',
        component: () => import('_c/area-data'),
        meta: { index: 2, title: '地区数据', icon: 'ios-folder-open-outline' }
      },
      {
        path: '/foldertree',
        name: 'foldertree',
        component: () => import('@/views/folder-tree'),
        meta: { index: 2, title: '文件树', icon: 'ios-folder-open-outline' }
      }
    ]
  },
  {
    path: '/pwdsuccess',
    name: 'pwdsuccess',
    component: () => import("@/views/personalsettings/Change_Password_Success.vue"),
    meta: { index: 0, title: '修改成功', icon: 'md-checkmark-circle' }
  },
  {
    path: '*',
    component: () => import('@/views/common/404.vue'),
    meta: { index: 0, title: '404' }
  }
]