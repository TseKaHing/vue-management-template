var request = require("request");
var cheerio = require("cheerio");
var models = require('../db/models')

var proxys = [];  //保存从网站上获取到的代理
var useful = [];  //保存检查过有效性的代理
var getConfigFromUseful = []

var options = {
  url: "https://www.xicidaili.com/nn",
  method: "GET",
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
  }
}

function fetch(speed, connectTime) {
  return new Promise((resolve, reject) => {
    request(options, async function (err, response, body) {
      if (err === null && response.statusCode === 200) {
        var proxysFromBody = await analyzeBody(body, speed, connectTime)
        resolve(proxysFromBody)
      } else {
        // reject(new Error('链接失败！'))
        console.log('链接失败！');
      }
    })
  })
}

function analyzeBody(body, speed, connectTime) {
  var $ = cheerio.load(body);
  var trs = $("#ip_list tr");
  for (var i = 1; i < trs.length; i++) {
    var proxy = {};
    tr = trs.eq(i);
    tds = tr.children("td");
    proxy['ip'] = tds.eq(1).text();
    proxy['port'] = tds.eq(2).text();
    proxy['address'] = tds.eq(3).text().replace('\ng', '').trim()
    proxy['isAnonymous'] = tds.eq(4).text()
    proxy['type'] = tds.eq(5).text();
    proxy['speed'] = tds.eq(6).children("div").attr("title");
    proxy['speed'] = parseFloat(proxy['speed'].substring(0, proxy['speed'].length - 1));
    proxy['connectTime'] = tds.eq(7).children("div").attr("title");
    proxy['connectTime'] = parseFloat(proxy['connectTime'].substring(0, proxy['connectTime'].length - 1));
    proxy['survivalTime'] = tds.eq(8).text()
    proxy['verifyTime'] = tds.eq(9).text()
    if (proxy['speed'] < speed && proxy['connectTime'] < connectTime) { //用速度和连接时间筛选一轮
      proxys.push(proxy);
    }
  }
  return proxys
}

function check(proxys) {
  return new Promise((resolve, reject) => {
    var flag = proxys.length
    for (let i = 0; i < proxys.length; i++) {
      var proxy = proxys[i]
      request({
        url: 'http://www.thinkingbig.club',
        method: 'GET',
        timeout: 1000,
        proxy: proxy['type'].toLowerCase() + '://' + proxy['ip'] + ":" + proxy['port'],
      }, async function (err, response, body) {
        if (!err) {
          if (response.statusCode === 200) {
            useful.push(response.request['proxy']['host']);
          } else {
            // console.log(response.request['proxy']['host'], "failed!");
          }
        } else {
          // reject(new Error('One proxy failed!'))
        }
        flag--
        if (flag == 0) {
          var config = await getConfigByIp(useful)
          resolve(config)
        }
      })
    }
  })
}

function getConfigByIp() {
  for (let i = 0; i < useful.length; i++) {
    for (let item in proxys) {
      if (proxys[item].ip + ':' + proxys[item].port === useful[i]) {
        getConfigFromUseful.push(proxys[item])
      }
    }
  }
  return getConfigFromUseful
}

// fetch(2, 2).then(proxysFromBody => {
//   check(proxysFromBody).then(config => {
//     console.log(config);
//   })
// })


var getIps = function (speed, connectTime) {
  fetch(speed, connectTime).then(proxysFromBody => {
    check(proxysFromBody).then(async config => {
      // console.log(config);
      // models.Ips.find().then(res => console.log(res));
      await models.Ips.deleteMany().then(res => res)
      for (let ip in config) {
        await new models.Ips(config[ip]).save(err => {
          if (err) {
            console.log(err);
          }
        })
      }
      console.log("全部IP插入完毕！");
    })
  })
}

module.exports = getIps