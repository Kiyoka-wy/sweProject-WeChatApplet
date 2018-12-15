// pages/task/detail/detail.js
var app = getApp();

Page({
  data: {
    taskID:0,
    type:'',
    title: 0,
    content: "",
    fromLocation: "",
    toLocation: "",
    HideContent: "",
    limit:0,
    targetTime: 0,
    clearTimer: false
  },
  
  onLoad: function (options) {
    this.setData({
      taskID: options.taskID
    });
      var that = this
      wx.request({
        url: app.globalData.sweURL + '/getTaskInfoByID',
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
                "limit": res.data.leftHours,
                "money": res.data.bonousType + res.data.bonousAmount,
                "fromLocation": res.data.from,
                "toLocation": res.data.to,
                "HideContent": res.data.description_2,
                targetTime: new Date().getTime() + 1000 * 60 * 60 * res.data.leftHours,
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
  
  handleClick1(){

    wx.showModal(
      {
        title: '是否已经完成任务？',
        content: '请确认您已经完成任务',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.showToast(
              {
                title: '完成任务！',
                duration: 1000
              })
            wx.switchTab({
              url: '../../mine/mine'
            })
          }
        }
      })

  },

  handleClick2() {

    wx.showModal(
      {
        title: '是否要取消任务？',
        content: '任务将被取消',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.showToast(
              {
                title: '取消任务！',
                duration: 1000
              })
            wx.switchTab({
              url: '../../mine/mine'
            })
          }
        }
      })

  },
  

  onUnload() {
    this.setData({
      clearTimer: true
    });
  },
  myLinsterner(e) {
    this.setData({
      status: '结束'
    });
  }
  
});
