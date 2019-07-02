export default {
  methods: {
    LoginAuthenrization(res, target) {
      this.getAuthenrazation(res)
      if (Lockr.get('token') !== "undefind" && res.data.status == 200) {
        this.$router.push({ name: target })
      }

      // console.log(res.data)
      // this.hasToken(target)
    },
    routerAuthenrization(res, url, params) {
      if (!Lockr.get('token')) {
        // const
      }
    },
    getAuthenrazation(res) {
      Lockr.set('token', res.headers.token)   // 获取http头部的token
      axios.defaults.headers.common['Authorization'] = Lockr.get('token') // 把获取到的token写入到http头部 
      console.log("头部的token：" + axios.defaults.headers.common['Authorization'])
    },

    loginOut(target) {
      //   Lockr.rm('token', axios.defaults.headers.common['Authorization'])
      //   axios.defaults.headers.common['Authorization'] = Lockr.get('token')
      this.getUserNameAndRememberKey()
      this.$router.replace({ name: target })

    },
    getUserNameAndRememberKey() {
      Lockr.get("userName");
      Lockr.get("rememberKey");
    },

    reLogin() {
    },
    // 异步请求，type=>请求类型，
    asyncRequest(type, url, data, id) {
      switch (type) {
        case "GET":
          return new Promise((resolve, reject) => {
            axios.get(url, { params: data }).then(res => {
              this.handleResponse(res.data, resolve, reject)
            }, err => {
              reject(err)
              this.showHttpError(err)
            })
          })
        case "POST":
          return new Promise((resolve, reject) => {
            console.log(params);
            axios.post(url, params).then(res => {
              console.log(res);
              this.handleResponse(res.data, resolve, reject)
            }, err => {
              reject(err)
              this.showHttpError(err)
            })
          })
        case "PUT":
          return new Promise((resolve, reject) => {
            if (url.charAt(url.length - 1) != '/') {
              url += '/'
            }
            axios.put(url + id, params).then(res => {
              this.handleResponse(res.data, resolve, reject)
            }, err => {
              reject(err)
              this.showHttpError(err)
            })
          })
        case "DELETE":
          return new Promise((resolve, reject) => {
            if (url.charAt(url.length - 1) != '/') {
              url += '/'
            }
            axios.delete(url + id, params).then(res => {
              this.handleResponse(res.data, resolve, reject)
            }, err => {
              reject(err)
              this.showHttpError(err)
            })
          })
      }
    },
    handleResponse(data, resolve, reject) {
      if (data.status == 200) {
        resolve(res)
      } else {
        if (typeof reject == 'function') {
          reject(data)
        }
        this.handleError(data)
      }
    },
    handleError(data) {
      if (data.status) {
        // 根据后端返回的状态码，进行相应的处理
        switch (data.status) {
          case value:

            break;

          default:
            break;
        }
      }
    },
    // 显示错误类型
    showHttpError(err) {
      if (400 <= err.status < 500) {
        this.$Message.error(err.status + err.message)
      } else if (err.status >= 500) {
        this.$Message.error(err.status + err.message)
      }
    }
  },
}

