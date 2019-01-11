//index.js
//获取应用实例
var app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
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
    tasks:[],
    firstTasks:[],
    order:["按时间排序","按积分排序","智能排序","距离排序"],
    index:2
  },

  onLoad: function () {
    wx.request({
      url: app.globalData.sweURL + '/setProfileState',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        userID: app.globalData.userID,
      },
    })
    
    if (app.globalData.myUserData.profileState == "N") {
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
    }
    qqmapsdk = new QQMapWX({
      key: 'I22BZ-VRX3R-ILTW5-WC3L7-BVZNJ-DMFGB'
    });
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

  bindChange: function (e) {
    console.log('选择的是', e.detail.value)
    console.log('选择的是', this.data.order[e.detail.value])
    if (e.detail.value == 0) {
      this.timeSort()
    }
    else if (e.detail.value == 1) {
      this.bonnousSort()
    }
    else if (e.detail.value == 2) {
      this.setData({
        tasks: this.data.firstTasks
      })　
    }
    else if (e.detail.value == 3) {
      this.setData({
        tasks: this.data.firstTasks
      })
    }
    this.setData({
      index: e.detail.value,
    })
  },
  timeSort: function () {
    var arr = this.data.firstTasks
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        if (arr[j].releaseDate < arr[j + 1].releaseDate) { //相邻元素两两对比
          var temp = arr[j + 1]; //元素交换
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    console.log("timeSort", arr)
    this.setData({
      tasks: arr
    })　
  },
  bonnousSort: function () {
    var arr = this.data.firstTasks
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      for (var j = 0; j < len - 1 - i; j++) {
        if (parseInt(arr[j].bonousDescription) < parseInt(arr[j + 1].bonousDescription)){ //相邻元素两两对比
          var temp = arr[j + 1]; //元素交换
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
    }
    console.log("bonnousSort", arr)
    this.setData({
      tasks: arr
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
        that.data.firstTasks=that.data.tasks
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
