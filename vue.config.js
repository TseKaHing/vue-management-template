const BASE_URL = process.env.NODE_ENV === 'production' ? '/iview-admin': '/'
const path = require('path')

const resolve = dir => path.join(__dirname, dir) 
module.exports = {
  lintOnSave: false,
  baseUrl:BASE_URL,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件，可减少打包时的体积，加快打包速度 
  productionSourceMap: false,
  devServer: {
    // 需要代理的URL, 任何位置请求都代理到这个URL
    // proxy: 'http://localhost:4000'
  }

}
