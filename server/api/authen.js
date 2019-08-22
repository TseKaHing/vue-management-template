const express = require('express')
const router = express.Router()
const authen_url = require('../utils/github')
router.get('/github', async (req, res, next) => {
  res.json({
    code: 200,
    authen_url
  })
})

module.exports = router