
var port=9001;
var express = require('express');
var fs=require('fs');
var path=require('path')
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200); //让options请求快速返回
  }
  else {
    next();
  }
});
app.post('/postData',function (req,res) {//拖拽后的文件的位置信息

  var oldjInfoJson=fs.readFileSync(path.join(__dirname,'./dist/data/req.txt')).toString();
  var oldJson= JSON.parse(oldjInfoJson)

  var oldInputInfoJson={
    sid:oldJson.sid,
    urlLp:oldJson.urlLp,
    urlTp:oldJson.urlTp,
    title:oldJson.title
  }
  var newInfoJson=Object.assign(req.body,oldInputInfoJson)//为了处理覆盖的问题
  fs.writeFile(path.join(__dirname,'./dist/data/req.txt'),JSON.stringify(newInfoJson),function(err) {
    if (err) {
      return console.error(err);
    }
    // console.log("数据写入成功！");
  })
  res.send('最新位置已保存');
})
app.post('/setInfo',function (req,res) {//设置页面的内容信息
  var oldjInfoJson=fs.readFileSync(path.join(__dirname,'./dist/data/req.txt')).toString()
  // console.log(JSON.parse(oldjInfoJson));
  // console.log(req.body);
  var newInfoJson=Object.assign(JSON.parse(oldjInfoJson),req.body)
  fs.writeFile(path.join(__dirname,'./dist/data/req.txt'),JSON.stringify(newInfoJson),function(err) {
    if (err) {
      return console.error(err);
    }
    // console.log("数据写入成功！");
  })
  res.send('info1️已保存');
})
app.post('/postBtnInfo',function (req,res) {//设置btn的宽高信息
  var oldjInfoJson=fs.readFileSync(path.join(__dirname,'./dist/data/req.txt')).toString()
  // console.log(JSON.parse(oldjInfoJson));
  // console.log(req.body);
  var newInfoJson=Object.assign(JSON.parse(oldjInfoJson),req.body)
  fs.writeFile(path.join(__dirname,'./dist/data/req.txt'),JSON.stringify(newInfoJson),function(err) {
    if (err) {
      return console.error(err);
    }
    // console.log("数据写入成功！");
  })
  res.send('submit ok')
})
app.get('/output',function (req,res) {//输出新的html 文件
  var oldInfoJson=fs.readFileSync(path.join(__dirname,'./dist/data/req.txt')).toString()
  var oInfo=JSON.parse(oldInfoJson);
  console.log(oInfo);
  var sHtml='<html><head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">\n' +
    '  <!---->\n' +
    '  <meta name="twitter:card" content="summary_large_image">\n' +
    '  <meta name="twitter:site" content="@stager">\n' +
    '  <meta name="twitter:title" content="Stager Live Stager News">\n' +
    '  <meta name="twitter:image" class="urlTp" content="'+oInfo.urlTp+'">\n' +
    '  <meta name="twitter:description" content="いつもStagerLIveの公式配信を楽しんで見ていただき、誠にありがとうございます。">\n' +
    '  <meta property="og:url" class="urlLp" content="'+oInfo.urlLp+'">\n' +
    '  <meta property="og:title" content="Stager Live Stager News">\n' +
    '  <meta property="og:type" content="article">\n' +
    '  <meta property="og:description" content="いつもStagerLIveの公式配信を楽しんで見ていただき、誠にありがとうございます。">\n' +
    '  <meta property="og:image" class="urlTp" content="'+oInfo.urlTp+'">\n' +
    '  <!---->\n' +
    '  <meta name="description" content="いつもStagerLIveの公式配信を楽しんで見ていただき、誠にありがとうございます。">\n' +
    '  <meta name="keywords" content="stager,live,hot live">\n' +
    '  <meta property="fb:app_id" content="523144861213633">\n' +
    '  <meta property="og:width" content="800">\n' +
    '  <meta property="og:height" content="414">\n' +
    '  <title>'+oInfo.title+'</title>\n' +
    '  <link rel="shortcut icon" href="favicon.png">\n' +
    '  <script>\n' +
    'console.warn(\'将根据已有的meta标签来设置缩放比例\');\n'+
    '        window.fbAsyncInit = function () {\n' +
    '          FB.init({\n' +
    '            appId: \'523144861213633\',\n' +
    '            xfbml: true,\n' +
    '            version: \'v2.8\'\n' +
    '          });\n' +
    '          (function (d, s, id) {\n' +
    '            var js, fjs = d.getElementsByTagName(s)[0];\n' +
    '            if(d.getElementById(id)) {\n' +
    '              return;\n' +
    '            }\n' +
    '            js = d.createElement(s);\n' +
    '            js.id = id;\n' +
    '            js.src = "//connect.facebook.net/en_US/sdk.js";\n' +
    '            fjs.parentNode.insertBefore(js, fjs);\n' +
    '          }(document, \'script\', \'facebook-jssdk\'));\n' +
    '        }\n' +
    '\n' +
    '        function setRemFontSize(baseSize, baseWidth) {\n' +
    '          var baseSize = baseSize || 20,\n' +
    '            baseWidth = baseWidth || 375,\n' +
    '            clientWidth = document.documentElement.clientWidth;\n' +
    '          if(clientWidth < 320) {\n' +
    '            clientWidth = 320;\n' +
    '          }\n' +
    '          if(clientWidth > 750) {\n' +
    '            clientWidth = 750;\n' +
    '          }\n' +
    '          document.getElementsByTagName(\'html\')[0].style.fontSize = clientWidth / baseSize + \'px\'\n' +
    '        }\n' +
    '        setRemFontSize();\n' +
    '        window.addEventListener("resize", function () {\n' +
    '          setTimeout(function () {\n' +
    '            setRemFontSize();\n' +
    '          }, 200)\n' +
    '        });'+
    '  </script>\n' +
    '  <style>\n' +
    '    body {\n' +
    '      position: relative;\n' +
    '      width: 100%;\n' +
    '    }\n' +
    '    html, body, img, div {\n' +
    '      margin: 0;\n' +
    '      padding: 0;\n' +
    '    }\n' +
    '    *:focus{\n' +
    '      outline: none;\n' +
    '    }\n' +
    '    #lp {\n' +
    '      width: 20rem;\n' +
    '    }\n' +
    '    #btn {\n' +
    '      position: absolute;\n' +
    '      line-height: '+oInfo.btnHeight+';\n' +
    '      height: '+oInfo.btnHeight+';\n' +
    '      width: '+oInfo.btnWidth+';\n' +
    '      text-align: center;\n' +
    '    }\n' +
    '  </style>\n' +
    '</head>\n' +
    '<body style="">\n' +
    '<img src="../../dist/images/lp.jpeg" alt="" id="lp">\n' +
    '<script>\n' +
    '  function ajax({url, type = \'GET\', isAsync = true,isJson=false, callback,data=null}) {\n' +
    '    if (typeof callback !== \'function\' || !window.XMLHttpRequest) return;\n' +
    '    var xhr = new XMLHttpRequest()\n' +
    '    xhr.open(type, url, isAsync)\n' +
    '//    xhr.withCredentials = true\n' +
    '    if(isJson){\n' +
    '      xhr.setRequestHeader("Content-type", "application/json");\n' +
    '    }\n' +
    '    xhr.onreadystatechange = function () {\n' +
    '      if (xhr.readyState === 4) {\n' +
    '        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {\n' +
    '          callback(xhr.responseText)\n' +
    '        }\n' +
    '      }\n' +
    '    }\n' +
    '    console.log(data);\n' +
    '    xhr.send(data)\n' +
    '  }\n' +
    '</script>\n' +
    '<script>\n' +
    '  var u = navigator.userAgent;\n' +
    '  var isIOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端\n' +
    '  var isAndroid = u.indexOf(\'Android\') > -1 || u.indexOf(\'Adr\') > -1; //android\n' +
    '  var nowTimeApp;\n' +
    '  document.body.onTouchStart = function (e) {\n' +
    '    e = e || window.event;\n' +
    '    var target = e.target || e.srcElement;\n' +
    '    if (target.id !== \'btn\') {\n' +
    '      return\n' +
    '    }//如果点击的不是这个按钮，就不会触发任何效果\n' +
    '    nowTimeApp = new Date().getTime();\n' +
    '    var userId = target.getAttribute("sid");\n' +
    '    console.log(userId);\n' +
    '    if (isIOS) {\n' +
    '      try {\n' +
    '        window.webkit.messageHandlers.stagerGotoHomePage.postMessage({\n' +
    '          targetUserId: userId\n' +
    '        });\n' +
    '      } catch (e) {\n' +
    '        window.location.href = "com.xhh.stagerlive.openfromWeb://homepageuserid=" + userId + "&token=i" + nowTimeApp; //ios app协议\n' +
    '        setTimeout(function () {\n' +
    '          ajax({\n' +
    '            url: "http://101.201.114.80:8085/api/v1/h5?gettoken=i" + nowTimeApp,\n' +
    '            callback: function (data) {\n' +
    '              var ip = JSON.parse(data)[\'ip\'];\n' +
    '              if (!ip) { //下载app\n' +
    '                window.location.href = \'https://app.adjust.com/b2elxd\';\n' +
    '              } else { //在app打开\n' +
    '                console.log("stagerLive");\n' +
    '              }\n' +
    '            }\n' +
    '          });\n' +
    '        }, 2000);\n' +
    '      }\n' +
    '    } else if (isAndroid) {\n' +
    '      try {\n' +
    '        AndroidEvent.GotoHomePage(userId);\n' +
    '      } catch (e) {\n' +
    '        window.location.href = "com.stager.stager://data/sun/userId=" + userId + "&token=a" + nowTimeApp; //Android app协议\n' +
    '        setTimeout(function () {\n' +
    '          ajax({\n' +
    '            url: "http://101.201.114.80:8085/api/v1/h5?gettoken=a" + nowTimeApp,\n' +
    '            callback: function (data) {\n' +
    '              var ip = JSON.parse(data)[\'ip\'];\n' +
    '              if (!ip) { // 手机没app\n' +
    '                window.location.href = \'https://app.adjust.com/w3yjwl\';\n' +
    '              } else { // 手机 有app\n' +
    '                console.log("stagerLive");\n' +
    '              }\n' +
    '            }\n' +
    '          });\n' +
    '        }, 3000);\n' +
    '      }\n' +
    '    }\n' +
    '  };\n' +
    '</script>\n' +
    '<div id="btn" sid="'+oInfo.sid+'" style="bottom: inherit; left: '+oInfo.left+'; top: '+oInfo.top+'"></div></body></html>';
  // '<div id="btn" sid="'+oInfo.sid+'" style="bottom: inherit; left: '+oInfo.left+'; top: '+oInfo.top+'">'+oInfo.buttonShow+'</div></body></html>'
  fs.writeFile(path.join(__dirname,'./dist/views/lp.html'),sHtml,function(err) {
    if (err) {
      return console.error(err);
    }
    // console.log("数据写入成功！");
  })
  res.send('ok')
})

var server=app.listen(port,function () {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});