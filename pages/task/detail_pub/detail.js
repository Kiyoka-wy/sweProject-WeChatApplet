// pages/task/detail_pub/detail.js
var app = getApp();

Page({
  data: {
    taskID: 0,
    type: '',
    title: 0,
    content: "",
    fromLocation: "",
    toLocation: "",
    HideContent: "",
    limit: 0,
    targetTime: 0,
    clearTimer: false
  },

  onLoad: function (options) {
    this.setData({
      targetTime: new Date().getTime() + 6430000,
      taskID: options.taskID
    })
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
              "targetTime": new Date().getTime() + 1000 * 60 * 60 * res.data.leftHours,
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
  }
});
