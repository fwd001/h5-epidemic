import wx from 'wx'
import * as api from '../api'
// console.log(wx)

api
  .getWxTickt()
  .then(result => {
    console.log('wx:', result.data.jsapi_ticket)
    console.log('wx:', result.data.nonceStr)
    console.log('wx:', result.data.signature)
    console.log('wx:', result.data.timestamp)
    console.log('wx:', result.data.appid)
    console.log('wx:', result.data.url)

    wx.config({
      debug: false,
      appId: result.data.appid,
      timestamp: result.data.timestamp,
      nonceStr: result.data.nonceStr,
      signature: result.data.signature,
      jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
    })

    wx.ready(function() {
      wx.onMenuShareAppMessage({
        title: '2020品质文化宣传季活动', // 分享标题
        desc: '全国活动开展情况周动态', // 分享描述
        link: 'http://h5.idonc.com/statis/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://h5.idonc.com/statis/share/share.png', // 分享图标
        success: function() {}
      })

      wx.onMenuShareTimeline({
        title: '2020品质文化宣传季活动', // 分享标题
        link: 'http://h5.idonc.com/statis/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: 'http://h5.idonc.com/statis/share/share.png', // 分享图标
        success: function() {}
      })
    })
  })
  .catch(err => {
    console.log(err)
  })
