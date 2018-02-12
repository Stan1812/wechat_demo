// pages/artlist/list.js
let app = getApp();

Page({
  data: {
    artList: [],
    currentDate:'',
    pending:false
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
  getNowFormatDate() {
  let date = new Date()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = "0" + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate
  }
  let currentdate = date.getFullYear() + month + strDate
  return currentdate
},

getArticles(pra){
  let self = this
    wx.request({
      url: 'http://119.29.235.55:3000/api/articles',
      method: "POST",
      data: {
        date: pra
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        // self.data.artList.push(...res.data)
        let data  =  [...self.data.artList,...res.data]
        self.setData({
          artList: data,
          currentDate:res.data[5].data.date.curr,
          pending :false
        })
      }
    })
  },
  onReachBottom: function () {
    let loadStatus = this.data.pending
    if(!loadStatus){
      this.getArticles(this.data.currentDate)
    }
  console.log('fuck')
  },
  onLoad: function (options) {
    let today = this.getNowFormatDate()
    console.log(today)
    this.getArticles(today)
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
    console.log('cufkj')
    this.setdata({
      artList: []
    })
    let today = this.getNowFormatDate()
    console.log(today)
    this.getArticles(today)
  },

  /**
   * 页面上拉触底事件的处理函数
   */


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})