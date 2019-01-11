// pages/task/detail_pub/detail.js
var app = getApp();
var utils = require('../../../utils/util.js');

Page({
  data: {
    releaserID:0,
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
      taskID: options.taskID,
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
              "type": res.data.data.type,
              "title": res.data.data.title,
              "content": res.data.data.description_1,
              "time": res.data.data.dueDate,
              "nickname": res.data.data.nickname_r,
              "limit": res.data.data.leftHours,
              "money": res.data.data.bonousType + res.data.data.bonousAmount,
              "fromLocation": res.data.data.from,
              "toLocation": res.data.data.to,
              "HideContent": res.data.data.description_2,
              "targetTime": new Date().getTime() + 1000 * 60 * 60 * res.data.leftHours,
              "state": res.data.data.state,
              "releaserID": res.data.data.releaser
            }
          )
          that.setData({
            buttonx: utils.status(that.data.state,1).x,
            buttony: utils.status(that.data.state,1).y,
            buttonxc: utils.status(that.data.state,1).xc,
            buttonyc: utils.status(that.data.state,1).yc,
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

  CancelTask :function() {              //取消任务
    var that = this
    wx.showModal(
      {
        title: '是否要取消已发布的任务？',
        content: '任务将被取消',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.request({
              url: app.globalData.sweURL + '/cancelTask',
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                userID: that.data.releaserID,
                taskID: that.data.taskID,
              },
              success: function (res) {
                if (res.data.state) {
                  wx.showToast(
                    {
                      title: res.data.message,
                      duration: 5000
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
          }
        }
      })
  },

  CompleteTask: function() {        //发布人完成任务
    var that = this
    wx.showModal(
      {
        title: '完成任务？',
        content: '请确认任务是否已完成',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.request({
              url: app.globalData.sweURL + '/relCompleteTask',
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                taskID: that.data.taskID,
              },
              success: function (res) {
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
          }
        }
      })
  },

  WithdrawCancel() {        //发布人撤回取消
    var that = this
    wx.showModal(
      {
        title: '撤回取消任务？',
        content: '请确认是否要撤回对任务的取消',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.request({
              url: app.globalData.sweURL + '/undoCancel',
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                userID: that.data.releaserID,
                taskID: that.data.taskID,
              },
              success: function (res) {
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
          }
        }
      })
  },

  AgreeCancel() {        //发布人同意取消
    var that = this
    wx.showModal(
      {
        title: '同意取消任务？',
        content: '请确认是否同意取消任务',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.request({
              url: app.globalData.sweURL + '/acceptCancel',
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                userID: that.data.releaserID,
                taskID: that.data.taskID,
              },
              success: function (res) {
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
          }
        }
      })
  },

  DisagreeCancel() {        //发布人不同意取消
    var that = this
    wx.showModal(
      {
        title: '不同意取消任务？',
        content: '请确认是否不同意取消任务',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.request({
              url: app.globalData.sweURL + '/unacceptCancel',
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                userID: that.data.releaserID,
                taskID: that.data.taskID,
              },
              success: function (res) {
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
          }
        }
      })
  },

  UnacceptCancel(){        //发布人不同意完成任务
    var that = this
    wx.showModal(
      {
        title: '不同意完成任务？',
        content: '请确认任务是否还未完成',
        duration: 1000,
        success: function (res) {
          if (res.confirm) {
            // 点击确定后跳转首页并关闭当前页面
            wx.request({
              url: app.globalData.sweURL + '/relUnacceptComplete',
              method: 'POST',
              header: { 'content-type': 'application/x-www-form-urlencoded' },
              data: {
                taskID: that.data.taskID,
              },
              success: function (res) {
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
          }
        }
      })
  }

});
