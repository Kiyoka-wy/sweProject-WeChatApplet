// pages/details/details.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taskID:'',
    nickname: "",
    type:"",
    title: "",
    content: "",
    fromaddress: "",
    toaddress: "",
    limit: "",
    money: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      taskID: options.taskID
    });
    var that = this
    wx.request({
      url: 'http://localhost:8080/getTaskInfoByID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        taskID: this.data.taskID,
      },
      success: function (res) {
        if (res.data != null) {
          that.setData(
            {
              "type": res.data.type,
              "title": res.data.title,
              "content": res.data.description_1,
              "time": res.data.dueDate,
              "nickname": res.data.nickname_r,
              "limit": res.data.leftHours + '小时',
              "money": res.data.bonousType + res.data.bonousAmount,
              "fromaddress": res.data.from,
              "toaddress": res.data.to
            }
          )
        }
        else {
          wx.showToast(
            {
              title: "??",
              duration: 1000
            })
        }
      }
    })
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