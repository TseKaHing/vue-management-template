// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// 秘钥
const secretOrPrivateKey = "5678FEWFWEEWGW54W4GW4E65G4E"  // 私钥

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/user/register', (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  models.User.find({ username: req.body.username }, (err, data) => {
    if (err) {
      console.log(err)
      // res.send(err);
      let newUsername = new models.User({
        username: req.body.username,
        password: req.body.password
      });
      // 保存数据newUsername数据进mongoDB
      newUsername.save((err, data) => {
        if (err) {
          res.send({ 'status': 1001, 'message': 'Fail to register!', 'data': err });
        } else {
          res.send({ 'status': 1000, 'message': 'Register successfully!' });
        }
      });
    } else {
      console.log(data)
      if (data.length > 0) {
        res.send({ 'status': 1001, 'message': 'The username is already registered!' });
      } else {
        let newUsername = new models.User({
          username: req.body.username,
          password: req.body.password
        });
        // 保存数据newUsername数据进mongoDB
        newUsername.save((err, data) => {
          if (err) {
            res.send({ 'status': 1001, 'message': 'Fail to register!', 'data': err });
          } else {
            res.send({ 'status': 1000, 'message': 'Register successfully!' });
          }
        });
      }
    }
  });
});
// 获取已有账号接口

// 用户登录
router.post('/api/user/login', async (req, res) => {
  // 通过模型去查找数据库
  models.User.find({ username: req.body.username }, (err, docs) => {
    if (err) {
      res.send(err)
      return
    }
    if (docs.length > 0) {
      // token数据
      const payload = {
        username: req.body.username
      }

      // 登录的时候进行数字签证
      let token = jwt.sign(payload, secretOrPrivateKey, {
        issuer: "ThinkBig",
        expiresIn: 60 * 60 * 1   // 1小时过期
      })
      const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        docs[0].password
      )
      if (!isPasswordValid) {
        res.json({
          status: 2,
          message: '密码错误'
        })
        return false
      }
      docs[0].token = token
      models.User(docs[0].save(function (err) {
        if (err) {
          res.status(500).send("fail 500")
          return
        }

        // console.log("docs:" + docs);
        res.setHeader('token', token)
        res.json({
          status: 200,
          message: '登陆成功',
          username: req.body.username,
        })
      }))



    } else {
      res.json({
        status: 401,
        message: '用户名不存在'
      })
    }
  })
});


// 获取所有账号接口
router.get('/api/user/all', async (req, res) => {
  // 通过模型去查找数据库
  const users = await models.User.find()
  res.send(users)

});

router.post('/api/user/pwdchange', async (req, res) => {

  models.User.find({ username: req.body.username }, (err, docs) => { })

  const tokenFromClient = req.headers.authorization
  const currentPwd = req.body.currentPwd
  const newPwd = req.body.newPwd

  models.User.find({ username: req.body.username }, (err, docs) => {
    // 如果有错，则返回错误
    if (err) {
      console.log(err);
      res.json({
        status: 500,
        message: "服务器错误，请重试！"
      })
    }

    if (docs.length > 0) {
      // 如果请求头部没有token，则向客户端返回401错误
      if (tokenFromClient === 'undefined') {
        res.json({
          status: 401,
          message: "您没有修改密码的权限！"
        })
      }
      // 如果客户端请求头部拥有token，则验证该token是否由该服务端签发
      else {
        jwt.verify(tokenFromClient, secretOrPrivateKey, (err, decoded) => {
          // 如果不是由该服务端签发，贼返回403错误
          if (err) {
            console.log(err);
            res.json({
              status: 403,
              message: "非法请求！请求资源失败！"
            })
          }
          // token由该服务端签发，则请求成功，并更新数据表User中的password字段
          else {
            // 从数据库表中查找从客户端发送过来的username
            models.User.find({ username: req.body.username }, (err, docs) => {
              if (err) {
                console.log(err);
                res.json({
                  status: 404,
                  message: "找不到资源！"
                })
              }
              // 对原密码进行加密
              // 比对加密后的原密码是否正确
              const comparedPwd = require('bcrypt').compareSync(
                currentPwd,
                docs[0].password
              )
              // 原密码正确
              if (comparedPwd) {
                models.User.updateOne({ username: req.body.username }, { $set: { password: newPwd } }, (err, result) => {
                  if (err) {
                    console.log("error:" + err);
                  }
                  console.log(result);
                })
                res.json({
                  status: 200,
                  message: "修改成功！修改后的密码是：" + newPwd
                })
              }
              // 原密码不正确
              else {
                res.json({
                  status: 412,
                  message: "原密码错误，请重试！"
                })
              }
            })
          }
        })
      }
    }
  })
})




module.exports = router;