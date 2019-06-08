export default {
  methods: {
    LoginAuthenrization(res, target) {
      Lockr.set('token', res.headers.token)   // 获取http头部的token
      axios.defaults.headers.common['Authorization'] = Lockr.get('token') // 把获取到的token写入到http头部 
      console.log(axios.defaults.headers.common['Authorization'])
      this.$router.push({ name: target })
      // console.log(res.data)
      // this.hasToken(target)
    },
  },
}

