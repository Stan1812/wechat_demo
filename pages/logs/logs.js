//logs.js
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    artContent:{},
    article:""
  },
  onLoad: function () {
    let self = this
    wx.showLoading({ 
      title: '加载中',
    })
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        self.setData({
          artContent: res.data,
          article:WxParse.wxParse('article', 'html', res.data.data.content, self, 5)
        })
      }
    })
  }
})
