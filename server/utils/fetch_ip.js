var request = require("request");
var cheerio = require("cheerio");

var proxys = [];  //保存从网站上获取到的代理
var useful = [];  //保存检查过有效性的代理
var getConfigFromUseful = []

/**
 * 获取www.xicidaili.com提供的免费代理
 */
var getIps = async function (speed, connectTime) {
  url = "http://www.xicidaili.com/nn";  // 国内高匿代理
  request({
    url: url,
    method: "GET",
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36'
    }
  }, (error, response, body) => {
    if (!error) {
      analyzeBody(body, speed, connectTime)
      var c = new check()
      console.log('c', c);
    }
  });

}

var analyzeBody = function (body, speed, connectTime) {
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
}



var check = function () {
  //尝试请求百度的静态资源公共库中的jquery文件
  // var url = "http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js";
  var url = 'http://www.thinkingbig.club'
  var flag = proxys.length;  //检查是否所有异步函数都执行完的标志量
  for (var i = 0; i < proxys.length; i++) {
    var proxy = proxys[i];
    request({
      url: url,
      proxy: proxy['type'].toLowerCase() + '://' + proxy['ip'] + ":" + proxy['port'],
      method: 'GET',
      timeout: 1000
    }, function (error, response, body) {
      if (!error) {
        if (response.statusCode == 200) {
          //这里因为nodejs的异步特性，不能push(proxy),那样会存的都是最后一个
          useful.push(response.request['proxy']['host']);
          // getConfigByIp()
          // console.log(response.request['proxy']['host'], "useful!");
        } else {
          console.log(response.request['proxy']['host'], "failed!");
        }
      } else {
        // console.log("One proxy failed!");
      }
      flag--;
      if (flag == 0) {
        console.log('遍历完成！');
        // return getConfigByIp()
      }
    });
  }
  return getConfigByIp()
}

var getConfigByIp = function () {
  for (let i = 0; i < useful.length; i++) {
    for (let item in proxys) {
      if (proxys[item].ip + ':' + proxys[item].port === useful[i]) {
        getConfigFromUseful.push(proxys[item])
      }
    }
  }
  console.log(getConfigFromUseful.length);
  return getConfigFromUseful
}


getIps(2, 1)


module.exports = getIps
