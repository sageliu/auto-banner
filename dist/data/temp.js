window.onload=function() {
  document.body.addEventListener("touchend", function (e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.className !== 'btn') {
    }/*如果点击的不是这个按钮，就不会触发任何效果*/
    nowTimeApp = new Date().getTime();
    var userId = target.getAttribute("sid");
    console.log(userId);
    if (isIOS) {
      try {
        window.webkit.messageHandlers.stagerGotoHomePage.postMessage({
          targetUserId: userId
        });
      } catch (e) {
        window.location.href = "com.xhh.stagerlive.openfromWeb://homepageuserid=" + userId + "&token=i" + nowTimeApp; /*ios app协议*/
        setTimeout(function () {
          ajax({
            url: "http://101.201.114.80:8085/api/v1/h5?gettoken=i" + nowTimeApp,
            callback: function (data) {
              var ip = JSON.parse(data)['ip'];
              if (!ip) { /*下载app*/
                window.location.href = 'https://app.adjust.com/b2elxd';
              } else { /*在app打开*/
                console.log("stagerLive");
              }
            }
          });
        }, 2000);
      }
    } else if (isAndroid) {
      try {
        AndroidEvent.GotoHomePage(userId);
      } catch (e) {
        window.location.href = "com.stager.stager://data/sun/userId=" + userId + "&token=a" + nowTimeApp; /*Android app协议*/
        setTimeout(function () {
          ajax({
            url: "http://101.201.114.80:8085/api/v1/h5?gettoken=a" + nowTimeApp,
            callback: function (data) {
              var ip = JSON.parse(data)['ip'];
              if (!ip) { /* 手机没app*/
                window.location.href = 'https://app.adjust.com/w3yjwl';
              } else { /* 手机 有app*/
                console.log("stagerLive");
              }
            }
          });
        }, 3000);
      }
    }
  })
}