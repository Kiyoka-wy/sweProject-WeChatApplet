// pages/details/details.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:0,
    taskID:0,
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
    if (app.globalData.userID) {
      this.setData({
        userID: app.globalData.userID
      })
    }

    this.setData({
      taskID: options.taskID
    });
    var that = this
    wx.request({
      url: app.globalData.sweURL + '/getTaskInfoByID',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
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

  accepttask:function()
  {
    var that = this;
    wx.request({
      url: app.globalData.sweURL + '/acceptTask',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        accepterID: this.data.userID,
        taskID: this.data.taskID
      },
      success: function (res) {
        if (res.data.state) {
          wx.showModal(
            {
              title: '成功接受任务',
              content: res.data.message,
              duration: 1000,
              success: function (res) {
                if (res.confirm) {
                  // 点击确定后跳转首页并关闭当前页面
                  wx.switchTab({
                    url: '../index/index'
                  })
                }
              }
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