const express = require('express')
const router = express.Router()
const github_config = require('../utils/github')
const fetch = require('node-fetch');
router.get('/github', async (req, res, next) => {
  res.json({
    code: 200,
    authen_url: github_config.authorize_url + '?client_id=' + github_config.client_id
  })
})

router.post('/access_token', async (req, res, next) => {
  console.log(req.cookies.codeFromGithub);
  // code 存在
  if (req.cookies.codeFromGithub) {
    const params = {
      access_url: github_config.access_url,   // https://github.com/login/oauth/access_token
      token_url: 'https://api.github.com/user?access_token=',
      client_id: github_config.client_id,
      client_secret: github_config.client_secret,
      code: req.cookies.codeFromGithub
    }
    await fetch(params.access_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(res => {
      return res.text()
      // return res.text()
    }).then(body => {
      // console.log('body:', body);
      // body: access_token=018d539038b7bd9d849c20ea43e1a897d36ff5be & scope=& token_type=bearer
      //  &分隔参数
      const args = body.split('&')
      let arg_access_token = args[0].split('=')
      // =分隔第一个参数access_token, 使参数名access_token与参数值分开，这里获取到access_token的值
      const access_token = arg_access_token[1]
      console.log(access_token);
      return access_token
    }).then(async (token) => {
      console.log('token:', token);
      let token_url = params.token_url + token
      console.log('token_url:', token_url);
      await fetch(token_url).then(res => {
        return res.json();
      }).then(resp => {
        console.log(resp);
        res.setHeader('token', token)
        res.json({
          code: 200,
          resp,
          token
        })
      })
    }).catch(err => {
      console.log(err);
      res.json({
        code: 404,
        message: "请求资源失败！"
      })
    })
  } else {
    res.json({
      code: 404,
      message: "请求资源失败！"
    })
  }

})

module.exports = router
