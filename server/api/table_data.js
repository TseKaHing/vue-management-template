const models = require('../db/models');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')


router.get('/gettabledata', async (req, res, next) => {
  // console.log('请求成功');
  res.json({
    code: 200,
    arr: [
      {
        name: 'ThinkBig',
        age: '22',
        email: '1243756230@qq.com'
      },
      {
        name: 'admin',
        age: '30',
        email: 'admin@qq.com'
      },
      {
        name: 'hello',
        age: '28 ',
        email: 'hello@qq.com'
      },
    ]

  })
})


module.exports = router