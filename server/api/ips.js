const models = require('../db/models');
const express = require('express');
const router = express.Router();
var getIps = require('../utils/fetch')
// getIps(2, 2)
router.get('/fetch', (req, res) => {
  const speed = 2, connectTime = 2
  // console.log(models.Ips);
  getIps(speed, connectTime)
  models.Ips.find().then(ips => {
    res.status(200).json({
      code: 200,
      ips
    })
  })

})



module.exports = router