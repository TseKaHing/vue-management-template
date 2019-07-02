// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
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

})

module.exports = router