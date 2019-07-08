import { register, login, authorization, changepwd } from '@/api/user'
import { setToken, setUserInfo } from '@/lib/util'
import { Message } from 'iview'

const user = {
  state: {
    UserId: "",
    UserName: "",  //用户名
    UserPwd: "",  // 用户密码,
    MenuList: [],
    UserInfo: {       // 用户信息

    },
    rules: {}
  },
  mutations: {
    setUserId(state, UserId) {
      state.UserId = UserId
    },
    setUserName(state, UserName) {
      state.UserName = UserName
    },
    setUserPwd(state, UserPwd) {
      state.UserPwd = UserPwd
    },
    setMenuList(state, MenuList) {
      state.MenuList = MenuList
    },
    setUserInfo(state, UserInfo) {
      state.UserInfo = UserInfo
    },
    SET_RULES(state, rules) {
      state.rules = rules
    }
  },
  actions: {
    register({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        register({ username, password }).then(res => {
          if (res.data.code === 1000) {
            console.log(res.data.message);
            resolve()
          } else {
            reject(new Error(res.data.message))
          }
        }, err => {
          reject(err)
        }
        )
      })
    },

    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        login({ username, password }).then(res => {

          if (res.data.code === 401) {
            Message.error(res.data.message)
            return
          } else if (res.data.code == 200 && res.data.data.token) {
            const { _id, username, password, degree, token } = res.data.data.found_user
            setToken(token)
            setUserInfo(_id, username, password, degree)
            resolve()
            return
          }
          else {
            reject(new Error("无登录权限！"))
          }



        }, err => {
          reject(err)
        }

        )
      })
    },

    authorization({ commit }, token) {
      return new Promise((resolve, reject) => {
        authorization().then(res => {
          // console.log(res);
          if (parseInt(res.data.code) === 401) {
            reject(new Error('非法token！'))
          } else {
            setToken(res.data.data.token)
            resolve(res.data.data.rules.page)
            commit('SET_RULES', res.data.data.rules.component)
          }
        }, err => {
          reject(err)
        })
      })
    },

    changepwd({ commit }, { user_id, currentPwd, newPwd }) {
      return new Promise((resolve, reject) => {
        changepwd({ user_id, currentPwd, newPwd }).then(res => {
          // console.log(res);
          if (res.data.code === 412 || res.data.code === 401) {
            console.log(res);
            Message.error(res.data.message)
            reject(new Error(res.data.message))
          }
          else if (res.data.code === 200) {
            resolve()
          }
          // resolve(res)
          else reject(new Error("修改密码失败！"))
        }, err => {
          console.log(err.message);
          reject(err)
        }
        )
      })
    },
    logout() {
      setToken('')

    }


  }




}

export default user