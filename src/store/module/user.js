const user = {
  state: {
    UserId: "",
    UserName: "",  //用户名
    UserPwd: "",  // 用户密码,
    MenuList: [],
    UserInfo: {       // 用户信息

    }
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
    }
  }
}

export default user