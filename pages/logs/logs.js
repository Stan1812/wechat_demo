//logs.js
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    artContent:{},
    article:"",
    date:{},
    loadEnd:false
  },
  getRandom:function(){
    let self = this
    wx.pageScrollTo({
      scrollTop: 0
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/random?dev=1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        self.setData({
          artContent: res.data,
          date: res.data,
          loadEnd: true,
          article: WxParse.wxParse('article', 'html', res.data.data.content, self, 5)
        })
      }
    })
  },
  onLoad: function () {
    let self = this
    wx.showLoading({ 
      title: '加载中',
    })
    // wx.onCompassChange(function (res) {
    //   console.log(res.direction)
    // })
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res.data)
        self.setData({
          artContent: res.data,
          date:res.data,
          loadEnd:true,
          article:WxParse.wxParse('article', 'html', res.data.data.content, self, 5)
        })
      }
    })
  }
})
