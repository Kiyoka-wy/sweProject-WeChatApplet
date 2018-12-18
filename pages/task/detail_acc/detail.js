// pages/task/detail/detail.js
var app = getApp();
var utils = require('../../../utils/util.js');

Page({
  data: {
    accepterID:0,
    taskID:0,
    type:'',
    title: 0,
    content: "",
    fromLocation: "",
    toLocation: "",
    HideContent: "",
    limit:0,
    state: "",
    targetTime: 0,
    clearTimer: false,
    buttonx:"",
    buttony:"",
    buttonxc: "",
    buttonyc: "",
  },
  
  onLoad: function (options) {
    var state = this.data.state;
    this.setData({
      taskID: options.taskID,  
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
              "state": res.data.state,
              "money": res.data.bonousType + res.data.bonousAmount,
              "fromLocation": res.data.from,
              "toLocation": res.data.to,
              "HideContent": res.data.description_2,
              targetTime: new Date().getTime() + 1000 * 60 * 60 * res.data.leftHours,  
              "accepterID": res.data.accepter
            }
          )
          that.setData({
            buttonx: utils.status(that.data.state,2).x,
            buttony: utils.status(that.data.state,2).y,
            buttonxc: utils.status(that.data.state,2).xc,
            buttonyc: utils.status(that.data.state,2).yc,
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

  CancelTask: function () {              //接受人取消任务
    var that = this
    wx.showModal(
      {
        title: '是否要取消任务？',
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
                userID: that.data.accepterID,
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

  CompleteTask: function () {        //接收人完成任务
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
              url: app.globalData.sweURL + '/acpCompleteTask',
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

  WithdrawCancel() {        //接受人撤回取消
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
                userID: that.data.accepterID,
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



  AgreeCancel() {        //同意取消
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
                userID: that.data.accepterID,
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

  DisagreeCancel() {        //不同意取消
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
                userID: that.data.accepterID,
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
