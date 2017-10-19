let port = 9001;
let express = require('express');
let fs = require('fs');
let path = require('path')
let bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
let upload = require('./util/multerUtil')
// let stateJson=require('./dist/data/req.txt')
//multer有single()中的名称必须是表单上传字段的name名称。
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/dist', express.static(__dirname + '/dist/bgImages'));//访问html 的时候。172.16.1.20:9001/dist/lp.html   会访问dist/bgImages/lp.html
app.all('*', function (req, res, next) {
  res.header('charset', 'utf8');
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
app.post('/submitLpImgInfo', upload.single('lp'), function (req, res) {//上传图片的逻辑，用到了multer,
  if (req.file) {
    //如果上传成功，跳到首页
    console.log(req.file);
    // res.redirect('/')
    res.end('------上传lp背景图完成------');
  } else {
    res.end('------upload error------');
    console.log('------upload error------');
  }
});
app.post('/submitBannerImgInfo', upload.single('banner'), function (req, res) {//上传图片的逻辑，用到了multer,
  if (req.file) {
    //如果上传成功，跳到首页
    console.log(req.file);
    // res.redirect('/')
    res.end('------上传banner图完成------');
  } else {
    res.end('------upload error------');
    console.log('------upload error------');
  }
});
app.post('/submitTwitterImgInfo', upload.single('twitter'), function (req, res) {//上传图片的逻辑，用到了multer,
  if (req.file) {
    //如果上传成功，跳到首页
    console.log(req.file);
    // res.redirect('/')
    res.end('------上传twitter图完成------');
  } else {
    res.end('------upload error------');
    console.log('------upload error------');
  }
});

app.get('/getState', function (req, res) {
  let stateJson = fs.readFileSync(path.join(__dirname, './dist/data/req.txt')).toString();
  // console.log(typeof stateJson);//string
  res.send(stateJson);
})
app.post('/postState', function (req, res) {
  console.log(JSON.stringify(req.body));
  fs.writeFile(path.join(__dirname, './dist/data/req.txt'), JSON.stringify(req.body), err => {
    console.log(err);
  });
  res.send('ok');
})

app.get('/output', function (req, res) {//输出新的html 文件
  let oldInfoJson = fs.readFileSync(path.join(__dirname, './dist/data/req.txt')).toString()
  let oInfo = JSON.parse(oldInfoJson);
  console.log(oInfo);
  // let imgName=oInfo.imgUrl.i.split('/')[3];
  let imgName = 'lp.png';
  let script0='console.warn("将根据已有的meta标签来设置缩放比例");\n' + //移动端尺寸校正
  '        window.fbAsyncInit = function(){\n' +
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
  '        });\n' ;
  let scriptAjax='  function ajax({url, type = \'GET\', isAsync = true,isJson=false, callback,data=null}) {\n' +//封装的ajax方法
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
    '  };\n' ;
  let script1='function goAppHome(userId){\n' +//跳转App个人中心页面  -->对应selected   open
    '\tvar u = navigator.userAgent;\n' +
    '  var isIOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端\n' +
    '  var isAndroid = u.indexOf(\'Android\') > -1 || u.indexOf(\'Adr\') > -1; //android\n' +
    '  var nowTimeApp = new Date().getTime();\n' +
    '  if(isIOS) {\n' +
    '    try {\n' +
    '      window.webkit.messageHandlers.stagerGotoHomePage.postMessage({\n' +
    '        targetUserId: userId\n' +
    '      });\n' +
    '    } catch(e) {\n' +
    '     \tgoIosHomeErr(userId,nowTimeApp)\n' +
    '    }\n' +
    '  } else if(isAndroid) {\n' +
    '    try {\n' +
    '      AndroidEvent.GotoHomePage(userId);\n' +
    '    } catch(e) {\n' +
    '      goAdrErr(userId,nowTimeApp)\n' +
    '    }\n' +
    '  }\n' +
    '\n' +
    '};\n';
  let script2='function goLine(){\n' +//跳转line  -->对应selected   line
    '  var u = navigator.userAgent;\n' +
    '  var isIOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端\n' +
    '  var isAndroid = u.indexOf(\'Android\') > -1 || u.indexOf(\'Adr\') > -1; //android\n' +
    '  var nowTimeApp;\n' +
    '    if(isIOS) {\n' +
    '      try{\n' +
    '         window.webkit.messageHandlers.stagerGotoLineAt.postMessage();\n' +
    '      }           \n' +
    '      catch(e) {\n' +
    '        console.log(e)\n' +
    '      }\n' +
    '    } else if(isAndroid) {\n' +
    '      try {\n' +
    '        window.location.href="https://line.me/R/ti/p/%40stagerlive"\n' +
    '      } catch(e) {\n' +
    '        console.log(e)\n' +
    '      }\n' +
    '    }\n' +
    '};\n';
  let script3='function goEmail(name,url){\n' +    //跳转邮箱 -->对应selected   mail
    '  var oBtn=document.querySelector(name);\n' +
    '  oBtn.oncilck=function(){\n' +
    '    window.webkit.messageHandlers.stagerFeedback.postMessage({\n' +
    '      "type": "2",\n' +
    '      "url": url\n' +
    '    });\n' +
    '  }\n' +
    '    \n' +
    '};\n';
  let script4='function goAppHome(userId){\n' +//跳转视频播放页 -->对应selected   vedio
    'var u = navigator.userAgent;\n' +
    '  var isIOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端\n' +
    '  var isAndroid = u.indexOf(\'Android\') > -1 || u.indexOf(\'Adr\') > -1; //android\n' +
    '  var nowTimeApp = new Date().getTime();\n' +
    '  if(isIOS) {\n' +
    '    try {\n' +
    '      window.webkit.messageHandlers.stagerGotoHomePage.postMessage({\n' +
    '        targetUserId: userId\n' +
    '      });\n' +
    '    } catch(e) {\n' +
    '     \tgoIosVideoErr(userId,nowTimeApp)\n' +
    '    }\n' +
    '  } else if(isAndroid) {\n' +
    '    try {\n' +
    '      AndroidEvent.GotoHomePage(userId);\n' +
    '    } catch(e) {\n' +
    '      goAdrErr(userId,nowTimeApp)\n' +
    '    }\n' +
    '  }\n' +
    '\n' +
    '};\n';

  let script6='function goIosHomeErr(userId,nowTimeApp){\n' +//ios跳转个人主页失败执行
    'window.location.href = "com.xhh.stagerlive.openfromWeb://homepageuserid=" + userId + "&token=i" + nowTimeApp; //ios app协议\n' +
    ' setTimeout(function () {\n' +
    '   $.ajax({\n' +
    '     type: "get",\n' +
    '     url: "http://ip.stagerlive.jp:8085/api/v1/h5?gettoken=i" + nowTimeApp,\n' +
    '     success: function (data) {\n' +
    '       var ip = JSON.parse(data)[\'ip\'];\n' +
    '       if(!ip) { //下载app\n' +
    '         window.location.href = \'https://app.adjust.com/b2elxd\';\n' +
    '       } else { //在app打开\n' +
    '         console.log("stagerLive");\n' +
    '       }\n' +
    '     }\n' +
    '   });\n' +
    ' }, 2000);\n' +
    '};\n';
  let script7='function goAdrErr(userId,nowTimeApp){\n' +//安卓跳转个人主页失败执行
    '\twindow.location.href = "com.stager.stager://data/sun/userId=" + userId + "&token=a" + nowTimeApp; //Android app协议\n' +
    '  setTimeout(function () {\n' +
    '    $.ajax({\n' +
    '      type: "get",\n' +
    '      url: "http://ip.stagerlive.jp:8085/api/v1/h5?gettoken=a" + nowTimeApp,\n' +
    '      success: function (data) {\n' +
    '        var ip = JSON.parse(data)[\'ip\'];\n' +
    '        if(!ip) { // 手机没app\n' +
    '          window.location.href = \'https://app.adjust.com/w3yjwl\';\n' +
    '        } else { // 手机 有app\n' +
    '          console.log("stagerLive");\n' +
    '        }\n' +
    '      }\n' +
    '    });\n' +
    '  }, 3000);\n' +
    '};\n';
  let html1 = '<html><head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">\n' +
    '  <!---->\n' +
    '  <meta name="twitter:card" content="summary_large_image">\n' +
    '  <meta name="twitter:site" content="@stager">\n' +
    '  <meta name="twitter:title" content="Stager Live Stager News">\n' +
    '  <meta name="twitter:image" class="urlTp" content="' + oInfo.pageInfo.thisUrlTp + '">\n' +
    '  <meta name="twitter:description" content="いつもStagerLIveの公式配信を楽しんで見ていただき、誠にありがとうございます。">\n' +
    '  <meta property="og:url" class="urlLp" content="' + oInfo.pageInfo.thisUrlLp + '">\n' +
    '  <meta property="og:title" content="Stager Live Stager News">\n' +
    '  <meta property="og:type" content="article">\n' +
    '  <meta property="og:description" content="いつもStagerLIveの公式配信を楽しんで見ていただき、誠にありがとうございます。">\n' +
    '  <meta property="og:image" class="urlTp" content="' + oInfo.pageInfo.thisUrlTp + '">\n' +
    '  <!---->\n' +
    '  <meta name="description" content="いつもStagerLIveの公式配信を楽しんで見ていただき、誠にありがとうございます。">\n' +
    '  <meta name="keywords" content="stager,live,hot live">\n' +
    '  <meta property="fb:app_id" content="523144861213633">\n' +
    '  <meta property="og:width" content="800">\n' +
    '  <meta property="og:height" content="414">\n' +
    '  <title>' + oInfo.pageInfo.thisTitle + '</title>\n' +
    '  <link rel="shortcut icon" href="favicon.png">\n' +
    '  <script>\n' +
    script0+
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
    '    .btn {\n' +
    '      border: 3px solid #fff;\n' +
    '      position: absolute;\n' +
    '      z-index: 90;\n' +
    '    }\n' +
    '  </style>\n' +
    '</head>\n' +
    '<body style="">\n' +
    '<img src="./' + imgName + '" alt="" id="lp">\n';

  let html3 = '<script>  var u = navigator.userAgent;\n' +
    '  var isIOS = !!u.match(/\\(i[^;]+;( U;)? CPU.+Mac OS X/); /*ios终端*/\n' +
    '  var isAndroid = u.indexOf(\'Android\') > -1 || u.indexOf(\'Adr\') > -1; /*android*/\n' +
    '  var nowTimeApp;\n' +
  'function fn() { alert("未绑定事件") };\n' +
    'let obj={sid:0};\n' +
  'Array.prototype.map.call(document.getElementsByClassName("btn"),item=>{\n' +
    'obj.sid=item.getAttribute("data-sid").length>0?item.getAttribute("data-sid"):obj.sid;\n' +
    '});\n' +
    'let userId=obj.sid;\n' +
  // 'window.onload=function() { document.getElementsByClassName("btn")[1].onclick=fn; }' +
  '</script>' +
  '<script>\n' +
  scriptAjax+
    script1+
    script2+
    script3+
    script4+
    script6+
    script7+
  '</script>\n' +
  '</body></html>';
  let script111='function(){\n' +
    'alert(1234567)}'
  let html2 = ''
  oInfo.dragAbleBtnItems.map(item => {
    console.log(item.info);
    let method='';
    switch(item.info.selected){
      case 'open':
        method='goAppHome()';
        break;
        case 'vedio':
        method='goAppHome()';
        break;
       case 'line':
        method='goLine()';
        break;
       case 'mail':
        method='goEmail()';
        break;
       case 'twitter':
        method='goTwitter()';
        break;
      default:
        method='fn()';
    }
    html2 += '<div class="btn" data-sid="' + item.info.thisSid + '" style="bottom: inherit; left: ' + item.info.thisLeft + '; top: ' + item.info.thisTop + '; width:' + item.info.thisWidth + ';height: ' + item.info.thisHeight + ';border-radius:' + item.info.thisBorderRadius + '; " ontouchend="'+method+'"></div>'
  })
  fs.writeFile(path.join(__dirname, './dist/bgImages/lp.html'), html1 + html2 + html3, function (err) {
    if (err) {
      return console.error(err);
    }
    // console.log("数据写入成功！");
  })
  res.send('ok')
})

let server = app.listen(port, function () {
  let host = server.address().address
  let port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
