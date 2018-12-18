// pages/task/detail_pub/detail.js
var app = getApp();
var utils = require('../../../utils/util.js');

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
    clearTimer: false,
    state: "",
    buttonx: "",
    buttony: "",
    buttonxc: "",
    buttonyc: "",
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
              "state": res.data.state,
            }
          )
          that.setData({
            buttonx: utils.status(that.data.state).x,
            buttony: utils.status(that.data.state).y,
            buttonxc: utils.status(that.data.state).xc,
            buttonyc: utils.status(that.data.state).yc,
          })
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

  CancelPublish() {      //取消已发布的任务
    wx.showModal(
      {
        title: '是否要取消已发布的任务？',
        content: '任务将被取消',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.showToast(
              {
                title: '任务已取消发布',
                duration: 1000
              })
            wx.switchTab({
              url: '../../mine/mine'
            })
          }
        }
      })
  },

  CompleteTask() {        //发布人完成任务
    wx.showModal(
      {
        title: '完成任务？',
        content: '请确认任务是否已完成',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.showToast(
              {
                title: '任务完成！',
                duration: 1000
              })
            wx.switchTab({
              url: '../../mine/mine'
            })
          }
        }
      })
  },

  CancelTask() {        //发布人取消任务
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

});
