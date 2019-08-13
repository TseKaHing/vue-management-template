"use strict";
// 引入编写好的api
// const api = require('./api/user_api');

const user_api = require('./api/user')
const table_data = require('./api/table_data')
// 引入文件模块
const fs = require('fs');
// 引入处理路径的模块
const path = require('path');
var cookieParser = require('cookie-parser');
// 引入处理post数据的模块
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const secretOrPrivateKey = "5678FEWFWEEWGW54W4GW4E65G4E"  // 私钥
// 引入Express
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());


// const frontEnd_router = {
//   ''
// }

// 白名单后台接口, 如果在白名单中就不同jwt校验
const whiteList_url = {
  get: ['/user/authorization',],
  post: [
    '/user/register',
    '/user/getUserInfo',
    '/user/login',
  ]
}

// 黑名单用户
const blackList_Url = {
  get: [],
  post: []
}


// 在白/黑名单中的数组查找 url 
const isNeedAuthorization = (path_url, method_arr) => {
  return method_arr.some(item => item.includes(path_url))
}

// app.all('*', async (req, res, next) => {
//   console.log(req);
//   let method = req.method.toLowerCase()
//   console.log(method);
//   let path = req.path
//   if (whiteList_url[method] && isNeedAuthorization(path, whiteList_url[method])) {
//     // 如果该接口url在白名单中，就不用进行 token 校验
//     next()
//   }
//   else {
//     const token = req.headers.authorization
//     if (!token) {
//       // token 为 undefined (不存在)
//       res.status(401).json({
//         code: 401,
//         message: '没有操作权限'
//       })
//     } else {
//       jwt.verify(token, secretOrPrivateKey, (err, decoded) => {
//         if (err) {
//           res.status(401).json({
//             code: 401,
//             message: '非法操作，没有操作权限',
//             data: {}
//           })
//         } else {
//           req.body.username = decoded.name  // 把验证获得的 decoded.username 赋值给 请求的 req.body.username
//           next()
//         }
//       })
//     }
//   }
// })

// app.use(api);
app.use('/user', user_api)
app.use('/data', table_data)
// app.use('/data', table_data)
// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走../dist/index.html
app.get('*', function (req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})
// 监听 80 端口
app.listen(80, () => {
  console.log('success listen 80');
});
