//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userID:0,
    motto: 'Hello World',
    userInfo: {},
    avatarUrl:"",
    defUrl:"../../imgs/avatar.jpg",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  
  onLoad: function () {
    if (app.globalData.userID) {
      this.setData({
        userID: app.globalData.userID
      })
      //console.log("userid"+this.data.userID)
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    var that = this
    console.log("globalData.userID:", app.globalData.userID)
    wx.request({
      url: app.globalData.sweURL + '/getUserPic',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        userID: app.globalData.userID,
      },
      success: function (res) {
        console.log("返回数据", res.data.url)

        that.setData({
          avatarUrl: res.data.url
        })
      }
    })
  },

  onShow: function () {
    let avatarUrl = wx.getStorageInfoSync('url')
    this.onLoad();
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: 'avator/avator'
    })
  },
})
