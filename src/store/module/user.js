const user = {
  state: {
    UserName: "",  //用户名
    UserPwd: "",  // 用户密码
    UserInfo: {       // 用户信息

    }
  },
  mutations: {
    setUserName(state, UserName) {
      state.UserName = UserName
    },
    setUserPwd(state, UserPwd) {
      state.UserPwd = UserPwd
    },
    setUserInfo(state, UserInfo) {
      state.UserInfo = UserInfo
    }
  }
}

export default user