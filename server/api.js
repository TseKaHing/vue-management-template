// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


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
router.post('/api/user/login', async (req, res) => {
  // 通过模型去查找数据库
  models.User.find({ username: req.body.username }).exec((err, data) => {

    if (err) {
      throw err
    }
    if (data.length != 0) {
      let username = { username: req.body.username }
      let pwd = { password: req.body.password }
      const secretOrPrivateKey = "5678FEWFWEEWGW54W4GW4E65G4E"  // 私钥
      let token = jwt.sign(username, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 1   // 1小时过期
      })
      res.setHeader('token', token)
      const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        data[0].password
      )
      if (!isPasswordValid) {
        res.json({
          status: 2,
          message: '密码错误'
        })
        return false
      }


      res.json({
        status: 1,
        message: 'ok',

        username: req.body.username
      })

    }
    else {
      res.json({
        status: 401,
        message: '用户名不存在'
      })
    }

  })
  // if (!user) {
  //   return res.status(422).send({
  //     message: '用户名不存在'
  //   })
  // }
  // const isPasswordValid = require('bcrypt').compareSync(
  //   req.body.password,
  //   user.password
  // )
  // if (!isPasswordValid) {
  //   return res.status(422).send({
  //     message: '密码无效'
  //   })
  // }
});


// 获取所有账号接口
router.get('/api/user/all', async (req, res) => {
  // 通过模型去查找数据库
  const users = await models.User.find()
  res.send(users)

});

router.post('/api/user/pwdchange', async (req, res) => {
  const user_pwd_change = req.body
  console.log(models.User.find({ username: req.body.UserName }))
  const un = models.User.find({ username: req.body.UserName })
  console.log(un)
  models.User.find({ username: req.body.UserName }).exec((err, data) => {
    if (err) {
      throw err
    }
    if (user_pwd_change.currentPwd) {
      res.json({
        status: 1,
        message: 'ok',

        username: req.body.username
      })
    }
  })
})




module.exports = router;