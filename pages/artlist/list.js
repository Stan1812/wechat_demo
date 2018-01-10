// pages/artlist/list.js
let app = getApp();

Page({

  data: {
    artList: [{ title: "这是什么鬼", content: "就是这个鬼",date:20180110 }, { title: "fuck you", content: "fuck your self",date:20180110 }, { title: "这是什么鬼", content: "就是这个鬼",date:20180110 }, { title: "fuck you", content: "fuck your self",date:20180110 }, { title: "这是什么鬼", content: "就是这个鬼",date:20180110 }, { title: "fuck you", content: "fuck your self",date:20180110 }, { title: "这是什么鬼", content: "就是这个鬼",date:20180110 }, { title: "fuck you", content: "fuck your self",date:20180110 }, { title: "这是什么鬼", content: "就是这个鬼",date:20180110 }, { title: "fuck you", content: "fuck your self",date:20180110 }]
  },
  goDetail(event) {
    console.log(event)
    app.globalData.fromList = true
     app.globalData.date = event.currentTarget.dataset.date
    console.log(app.globalData)
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})