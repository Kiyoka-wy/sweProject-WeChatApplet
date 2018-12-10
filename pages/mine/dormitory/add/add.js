// pages/mine/address/add/add.js
var Utils = require("../../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  insertButton: function () {
    wx.request({
    url: '',
      method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      userID: this.data.userID,
        address: this.data.address,
          detailAddress: this.data.detailAddress
    },
    success: function (res) {
      console.log(res.data)
        if (res.data.state) {
        wx.showToast(
          {
            title: res.data.message,
            duration: 1000
          })
      }
      else {
        wx.showToast(
          {
            title: res.data.message,
            duration: 1000
          })
      }
    }
  })
  
},

  /**
   * 生命周期函数--监听页面加载
   */
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