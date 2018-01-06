//logs.js
const util = require('../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    artContent: {},
    article: "",
    loadEnd: false
  },
  requestFail() {
    wx.hideLoading()
    wx.showModal({
      title: '提示',
      content: '资源加载失败，将退回首页',
      success: function (res) {
        wx.navigateTo({
          url: '../index/index'
        })
      }
    })
  },
  getRandom() {
    let self = this
    wx.pageScrollTo({
      scrollTop: 0
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/random?dev=1',
      success: (res) => {
        wx.hideLoading()
        console.log(res.data)
        self.setData({
          artContent: res.data,
          date: res.data,
          loadEnd: true,
          article: WxParse.wxParse('article', 'html', res.data.data.content, self, 5)
        })
      },
      fail: self.requestFail
    })
  },
  onLoad: function () {
    let self = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://interface.meiriyiwen.com/article/today?dev=1',
      success: (res) => {
        wx.hideLoading()
        self.setData({
          artContent: res.data,
          date: res.data,
          loadEnd: true,
          article: WxParse.wxParse('article', 'html', res.data.data.content, self, 5)
        })
      },
      fail: self.requestFail
    })
  },
  onShareAppMessage: function (res) {
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: '一读',
      success: (res) => {
        console.log("分享成功")
      },
      fail: (res) => {
        console.log("分享失败")
      }
    }
  }
})