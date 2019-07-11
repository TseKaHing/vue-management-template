const path = require('path')


const resolve = dir => path.join(__dirname, dir)
module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件，可减少打包时的体积，加快打包速度 
  productionSourceMap: false,
  devServer: {
    // 需要代理的URL, 任何位置请求都代理到这个URL
    // proxy: 'http://129.28.177.110:3000/'
    proxy: 'http://0.0.0.0:80'
    // proxy: 'http://192.168.199.123:3000/'

  }

}
