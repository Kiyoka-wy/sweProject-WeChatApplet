//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userID:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current: 'tab1',
    current_scroll: 'tab1',
    currentData: 0,
    tasks:[
      {
        title: '一个任务标题',
        nickname: '发布人昵称',
        img: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        content: "此处为任务内容",
        time: "15:00"
      }
    ]
    
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
  onLoad: function () {
    if (app.globalData.userID) {
      this.setData({
        userID: app.globalData.userID
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  },

  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.sweURL + '/getAllTasks',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userID: 14,
      },
      success: function (res) {
        if (res.data != null) {
          for (let index = 0; index < 1; index++) {           //index问题
            let strtaskID = 'tasks[' + index + '].taskID'
            let strtitle = 'tasks[' + index + '].title'
            let strcontent = 'tasks[' + index + '].content'
            let strtime = 'tasks[' + index + '].time'
            let strnickname = 'tasks[' + index + '].nickname'
            that.setData(
              {
                [strtaskID]: res.data.taskList[index].taskID,
                [strtitle]: res.data.taskList[index].title,
                [strcontent]: res.data.taskList[index].description_1,
                [strtime]: res.data.taskList[index].dueDate,
                [strnickname]: res.data.taskList[index].nickname_r,
                /*
                "tasks[0].taskID": res.data.taskList[0].taskID,
                "tasks[0].title": res.data.taskList[0].title,
                "tasks[0].content": res.data.taskList[0].description_1,
                "tasks[0].time": res.data.taskList[0].dueDate,
                "tasks[0].nickname": res.data.taskList[0].nickname_r*/
              }
            )
          }
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

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
