//logs.js
const util = require('../../utils/util.js')
const app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    artContent: {},
    article: "",
    loadEnd: false,
    showMore:true
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
  getArt(tarUrl) {
    let self =this
    wx.request({
      url: tarUrl,
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
  getRandom() {
    let self = this
    wx.pageScrollTo({
      scrollTop: 0
    })
    wx.showLoading({
      title: '加载中',
    })
    self.getArt('https://interface.meiriyiwen.com/article/random?dev=1')
  },
  onLoad: function () {
    let self = this
    wx.showLoading({
      title: '加载中',
    })
    self.setData({
      showMore: app.globalData.fromList
    })
    if (app.globalData.fromList ){
      console.log('fuck1')
      self.getArt(`https://interface.meiriyiwen.com/article/day?dev=1&date=${app.globalData.date}`)
    }else{
      console.log('fuck2')
      self.getArt('https://interface.meiriyiwen.com/article/today?dev=1')
    }
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