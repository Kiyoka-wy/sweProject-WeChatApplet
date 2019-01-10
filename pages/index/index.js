//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userID:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current: 'tab1',
    current_scroll: 'tab1',
    currentData: 0,
    tasks:[]
    
  },

  onLoad: function () {
    wx.showModal({
      content: '是否查看教程指引？',
      confirmText: '确定',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../tutorial/tutorial'
          })
        }
      }
    })
  },

  jumpto: function () {
    wx.navigateTo({
      url: '../details/details',
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },

  handleChangeScroll({ detail }) {
    this.setData({
      current_scroll: detail.key
    });
  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow: function () {
    var that = this
    console.log("globalData.userID:", app.globalData.userID)
    wx.request({
      url: app.globalData.sweURL + '/getAllTasks',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        userID: app.globalData.userID,
      },
      success: function (res) {
        console.log("返回数据", res.data.data)
       
        that.setData({
          tasks: res.data.data
        })
        console.log("任务列表", that.data.tasks)
      }
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
