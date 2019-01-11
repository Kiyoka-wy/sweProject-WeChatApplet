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
    leftHours:0,
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
    console.log(new Date('2018-12-11 15:46:13'.replace(/-/g, "/")).getTime())
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
              "state": res.data.data.state,
              "money": res.data.data.bonousType + res.data.data.bonousAmount,
              "fromLocation": res.data.data.from,
              "toLocation": res.data.data.to,
              "HideContent": res.data.data.description_2,
              "accepterID": res.data.data.accepter,
              "leftHours": res.data.data.leftHours
            }
          )
          console.log("任务", res.data.data)
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
