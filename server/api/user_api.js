// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('../db/models');
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
          res.json({
            status: 1001,
            message: "注册失败！",
            data: err
          });
        } else {
          res.json({
            status: 1000,
            message: "注册成功！",
            _id: data._id
          });
        }
      });
    } else {
      if (data.length > 0) {
        res.json({
          status: 1001,
          message: "该用户名已经被注册！",
        });
      } else {
        let newUsername = new models.User({
          username: req.body.username,
          password: req.body.password
        });
        // 保存数据newUsername数据进mongoDB
        newUsername.save((err, data) => {
          if (err) {
            res.json({
              status: 1001,
              message: "注册失败！",
              data: err
            });
          } else {
            res.json({
              status: 1000,
              message: "注册成功！",
              _id: data._id

            });
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
    // 找不到该用户，则把404信息返回给客户端
    if (docs.length == 0) {
      res.json({
        status: 404,
        message: "找不到用户" + req.body.username
      })
      return
    }
    const foundToken = docs[0].token
    if (err) {
      res.json(err)
    }
    if (docs.length > 0) {
      // token数据
      const payload = {
        username: req.body.username
      }

      // 用户第一次登录的时候在数据库永久记录下token
      if (docs[0].token == undefined) {

        console.log("生成token前：", payload);
        // 登录的时候进行数字签证
        let token = jwt.sign(payload, secretOrPrivateKey, {
          mutatePayload: true,
          issuer: "ThinkBig",
          // expiresIn: 60 * 60 * 1   // 1小时过期
          expiresIn: 1
        })
        // 客户端发送过来的原密码跟数据库中的密码进行比较
        const isPasswordValid = require('bcrypt').compareSync(
          req.body.password,
          docs[0].password
        )
        console.log("生成token后：", payload);

        payload.a = "jvdkjv"
        console.log("修改", payload);
        res.setHeader('token', token)
        if (!isPasswordValid) {
          res.json({
            status: 2,
            message: '密码错误'
          })
        }
        docs[0].token = token
        models.User(docs[0].save(function (err) {
          if (err) {
            res.json({
              status: 500,
              message: "服务器错误，请重试！"
            })
          }
          res.json({
            status: 200,
            message: '登陆成功',
            username: req.body.username,
            _id: docs[0]._id
          })
        }))
      }
      // 如果不是第一次登录
      else {
        console.log("不是第一次生成token！");
        jwt.verify(foundToken, secretOrPrivateKey, (err, decoded) => {
          console.log("验证", decoded);
          if (err) {
            // 假如知行了该语句块，则证明有错，token超时或者无效，此时在数据库删除token域
            // res.setHeader('token', 'undefined')
            console.log("error:" + err);
            res.json({
              status: 403,
              message: err.message
            })
            models.User.updateOne({ username: req.body.username }, { $unset: { token: 1 } }, (err, result) => {
              console.log("result");
              console.log(result);
            })
            return
          }

          // 如果验证的用户名与数据库一致，就生成新的token
          if (decoded.username == docs[0].username) {
            const isPasswordValid = require('bcrypt').compareSync(
              req.body.password,
              docs[0].password
            )
            console.log(isPasswordValid);
            let newToken = jwt.sign(payload, secretOrPrivateKey, {
              issuer: "ThinkBig",
              expiresIn: 60 * 60 * 1   // 1小时过期
            })
            res.setHeader('token', newToken)
            if (!isPasswordValid) {
              res.json({
                status: 2,
                message: '密码错误'
              })
              return
            }
            models.User.updateOne({ username: req.body.username }, { $set: { token: newToken } }, (err, result) => {
              if (err) {


                res.json({
                  status: 401,
                  message: "请求登录失败"
                })
              }

              console.log("更新token成功！");

              res.json({
                status: 200,
                message: '登陆成功',
                reset: 'token更新',
                username: req.body.username,
                _id: docs[0]._id
              })

            })
          }


        })

      }


    } else {
      res.json({
        status: 401,
        message: '不存在该用户'
      })
    }
  })
});


// 获取所有账号接口
// router.get('/api/user/all', async (req, res) => {
//   // 通过模型去查找数据库
//   const users = await models.User.find()
//   res.send(users)

// });

router.post('/api/user/pwdchange', async (req, res) => {
  const tokenFromClient = req.headers.authorization
  const currentPwd = req.body.currentPwd
  const newPwd = req.body.newPwd

  models.User.find({ _id: req.body.UserId }, (err, docs) => {
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
            console.log("err:" + err);

            res.json({
              status: 403,
              message: "非法请求！请求资源失败！"
            })
          }
          // token由该服务端签发，则请求成功，并更新数据表User中的password字段
          else {
            // 从数据库表中查找从客户端发送过来的username
            models.User.find({ _id: req.body.UserId }, (err, docs) => {
              if (err) {
                // console.log(err);
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
                models.User.updateOne({ _id: req.body.UserId }, { $set: { password: newPwd } }, (err, result) => {
                  if (err) {
                    // console.log("error:" + err.type);

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


router.get('/api/user/authenlist', async (req, res) => {
  const tokenFromClient = req.headers.authorization
  jwt.verify(tokenFromClient, secretOrPrivateKey, (err, decoded) => {
    models.User.find({ username: decoded.username }, (err, docs) => {
      if (docs.length == 0) {
        res.json({
          status: 404,
          message: "找不到用户" + req.body.username
        })
        return
      }
      if (err) {
        res.json({
          status: 403,
          message: "非法请求！请求资源失败！"
        })

      }

      else {
        // models.MenuList.find((err, docs) => {
        //   const authenlist_zero = []
        //   for (let i in docs) {
        //     if (docs[i].degree == 0) {
        //       console.log("degree0");
        //       console.log(docs[i].authenlist);
        //       authenlist_zero.push(docs[i].authenlist)
        //     }
        //     if (docs[i].degree == 1) {
        //       console.log("degree1");
        //       console.log(docs[i].authenlist);
        //     }
        //     if (docs[i].degree == 2) {
        //       console.log("degree2");
        //       console.log(docs[2].authenlist);
        //     }
        //   }
        //   console.log(menulist);





        // })



        switch (docs[0].degree) {
          case 0:
            res.json({
              status: 200,
              message: "获取菜单列表成功！",
              menuList: [
                {
                  title: "首页",
                  name: "HomePge",
                  icon: "md-pie"
                },
                {
                  title: "上传资源",
                  name: "UploadResources",
                  icon: "ios-cloud-upload"
                },
                {
                  title: "系统设置",
                  name: "Settings",
                  icon: "ios-settings",
                  children: [
                    { title: "个人设置", name: "PersonalSettings", icon: "md-contact" },
                    {
                      title: "管理资源",
                      name: "ManageResources",
                      icon: "ios-folder-open",
                      children: [
                        {
                          title: "下载资源",
                          name: "DownloadedResources",
                          icon: "md-download"
                        },
                        { title: "垃圾桶", name: "dropbox", icon: "logo-dropbox" }
                      ]
                    }
                  ]
                }
              ]
            })

            break;
          case 1:
            res.json({
              status: 200,
              message: '获取菜单列表成功！',
              menuList: [
                {
                  child: 'lison',
                  son: 'yu'
                }
              ]
            })
            break

        }

      }
    })
  })



})


module.exports = router;


