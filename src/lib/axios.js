import axios from 'axios'
import { baseURL } from '@/config'
import { getToken } from '@/lib/util'
import { Spin } from 'iview';

class HttpRequest {
  // 默认是 BaseUrl
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {} // quene 存储请求队列
  }
  // 内置的全局配置
  getInsideConfig() {
    // 全局的一些配置
    const config = {
      baseUrl: this.baseUrl,
      headers: {
        'Content-Type': "application/json;charset=utf-8"
      }
    }
    return config
  }
  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()  // 加载完成
    }
  }
  interceptors(instance, url) {
    // 请求拦截器
    instance.interceptors.request.use(config => {
      // 添加全局的loading
      if (!Object.keys(this.queue).length) {
        // Spin.show()   // 加载中
      }
      this.queue[url] = true
      config.headers['Authorization'] = getToken()
      return config
    }, err => {
      return Promise.reject(err)
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      return { data, status }
    }, err => {
      this.destroy(url)
      return Promise.reject(err)
    })
  }
  request(options) {
    const instance = axios.create()   // 创建一个axios实例
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)    // 向拦截器传入axios实例
    return instance(options)
  }
}

export default HttpRequest