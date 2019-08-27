// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
// "use strict";
const models = require('../db/models');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// 秘钥
const secretOrPrivateKey = "5678FEWFWEEWGW54W4GW4E65G4E"  // 私钥

router.post('/getUserInfo', async (req, res, next) => {
  console.log('请求成功');
  res.status(200).send({
    code: 200,
    data: {
      name: 'ThinkBig'
    }
  })
})



router.get('/authorization', async (req, res, next) => {
  // console.log(req.body.username);
  // const username = req.body.username


  const payload = {
    username: "admin"
    // last_loginTimeStamp: Date.parse(new Date())
  }
  let token = jwt.sign(payload, secretOrPrivateKey, {
    // mutatePayload: true,
    issuer: "ThinkBig",
    expiresIn: 60 * 60 // 60s
  })

  res.status(200).json({
    code: 200,
    message: 'authorization success!',
    data: {
      token,
      rules: {
        page: {
          home: true,
          personalsettings: true,
          getUserInfo_demo: true,
          test: true,

          // changepwd: true,
          // pwdsuccess: true,
          // resetpwdbyemail: true,
          // login: true
        },
        component: {

        }
      }
    }
  })
  return

})


router.post('/register', async (req, res) => {
  models.User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      res.json({
        code: 1001,
        message: "注册失败，未知错误！"
      })
      return
    }
    if (user) {
      res.json({
        code: 1001,
        message: '该用户名已被注册！'
      })
      return
    } else {
      let newUser = new models.User({
        username: req.body.username,
        password: req.body.password
      })

      newUser.save((err, newuser) => {
        if (err) {
          res.status(500).json({
            code: 500,
            message: '服务器错误，保存失败！'
          })
          return
        }
        res.json({
          code: 1000,
          message: "注册成功！",
          _id: newuser._id
        })
        return
      })
    }
  })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (username) {
    // 用户名非空，查找数据库该该用户名
    models.User.findOne({ username }, (err, user) => {

      if (user === null) {
        res.json({
          code: 401,
          message: "不存在该用户！"
        })
      } else {
        // 找到该用户
        const found_user = user
        // 判断密码是否正确
        const isPasswordCorrect = require('bcrypt').compareSync(
          password,
          user.password
        )

        if (isPasswordCorrect) {
          // 如果密码正确，进行数字签证，生成token
          const payload = {
            username,
            last_loginTimeStamp: Date.parse(new Date())
          }
          let token = jwt.sign(payload, secretOrPrivateKey, {
            mutatePayload: true,
            issuer: "ThinkBig",
            expiresIn: 60 * 60 // 60s
          })
          user.token = token
          models.User(user.save(err => {
            if (err) {
              res.status(500).json({
                code: 500,
                message: '服务器错误，保存失败！'
              })
              return
            }
            res.setHeader('token', token)
            res.status(200).json({
              code: 200,
              message: '登录成功！',

              data: {
                token,
                found_user
              }
            })
            return
          }))

        } else {
          // 密码不正确
          res.json({
            code: 401,
            message: '密码不正确！'
          })
          return
        }


      }
    })

  } else {
    // 用户名为空
    res.json({
      code: 401,
      message: "用户名为空！"
    })
    return
  }

})

router.post('/changepwd', async (req, res) => {
  const tokenFromClient = req.headers.authorization
  console.log(tokenFromClient);
  const { user_id, currentPwd, newPwd } = req.body

  models.User.findById(user_id, (err, user) => {
    // console.log(user);
    if (err) {
      res.status(500).json({
        code: 500,
        message: "服务器错误，请重试！"
      })
      return
    }
    // 找到 user
    if (user) {
      // 如果请求头部没有token，则向客户端返回401错误
      if (tokenFromClient === 'undefined') {
        res.json({
          status: 401,
          message: "您没有修改密码的权限！"
        })
        return
      }

      // 如果客户端请求头部拥有token，则验证该token是否由该服务端签发
      else {
        jwt.verify(tokenFromClient, secretOrPrivateKey, (err, decoded) => {
          if (err) {
            res.status(401).json({
              code: 401,
              message: "非法请求！请求资源失败！"
            })
            return
          }
          console.log(decoded);

          const comparedPwd = require('bcrypt').compareSync(
            currentPwd,
            user.password
          )
          console.log(comparedPwd);
          // 客户端传过来的密码与数据库表密码一致
          if (comparedPwd) {
            models.User.updateOne({ _id: req.body.UserId }, { $set: { password: newPwd } }, (err, result) => {
              if (err) {
                res.status(500).json({
                  code: 500,
                  message: "服务器错误，请重试！"
                })
                return
              }
              console.log(result);
              res.status(200).json({
                code: 200,
                message: "修改成功！修改后的密码是：" + newPwd
              })
              return
            })

          }
          // 客户端传过来的密码与数据库表密码不一致
          else {
            res.json({
              code: 412,
              message: "原密码错误，请重试！"
            })
            return
          }

        })
      }
    }
  })
})


module.exports = router