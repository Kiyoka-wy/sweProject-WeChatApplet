//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    this.globalData.userID = wx.getStorageSync('userID')
    this.globalData.token = wx.getStorageSync('token')

  },

  login:function(){
    console.log("22")
    var that = this
    var account = wx.getStorageSync('account')
    var password = wx.getStorageSync('password')
    if (account != '' && password != '') {
      wx.request({
        url: that.globalData.sweURL + '/loginByPhone',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          phoneNumber: account,
          password: password
        },
        success: function (res) {
          if (res.data != null) {
            wx.showToast(
              {
                title: res.data.message,
                duration: 1000
              })
            if (res.data.state == 1) {
              that.globalData.userID = res.data.userID
              that.globalData.token = res.header.token
              wx.setStorageSync('userID', res.data.userID)
              wx.setStorageSync('token', res.header.token)
              that.onLoginSuccess()
              console.log("loginByPhone:", res.data)
              console.log("token:", res.header.token)
wx.switchTab({
                    url: '../../index/index'
                  })
            }
          }
          else {
            wx.showToast(
              {
                title: "？？",
                duration: 1000
              })
          }
        }
      })
    }

  },
  onLoginSuccess: function (){//登录成功后调用获取一些信息
    var that = this
    console.log("userID:", that.globalData.userID)
    //调用接口获取个人信息
    wx.request({
      url: that.globalData.sweURL + '/getUserInfo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': that.globalData.token
      },
      data: {
        userID: that.globalData.userID,
      },
      success: function (res) {
        if (res.data.data != null) {
          that.globalData.myUserData = res.data.data
          that.globalData.myUserData.sexofapi = res.data.data.sex
          if (that.globalData.myUserData.sexofapi == '1') that.globalData.myUserData.sex = '男'
          else if (that.globalData.myUserData.sexofapi == '2') that.globalData.myUserData.sex = '女'
          console.log("myUserData:", that.globalData.myUserData)
          console.log("res.data:", res.data.data)
          wx.request({
            url: that.globalData.sweURL + '/getDormitoryList',
            method: 'POST',
            header: {
              'content-type': 'application/json',
            },
            data: {},
            success: function (res) {
              console.log("getDormitoryList", res.data.data)
              that.globalData.myUserData.dormitory = res.data.data[that.globalData.myUserData.communityID - 1]
              console.log("myUserData:", that.globalData.myUserData)
            }
          })
        }
        else {
          wx.showToast(
            {
              title: "？？",
              duration: 1000
            })
        }
      }
    })

    wx.request({
      url: that.globalData.sweURL + '/getUserAddresses',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': that.globalData.token
      },
      data: {
        userID: that.globalData.userID,
      },
      success: function (res) {
        if (res.data.data != null) {
          that.globalData.place = res.data.data
          console.log("place", that.globalData.place)
        }
        else {
          wx.showToast(
            {
              title: "？？",
              duration: 1000
            })
        }
      }
    })
    var SocketTask = wx.connectSocket({
      url: that.globalData.sweWxURL+"/myWebSocket/" + that.
        globalData.userID,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: {
        userID: that.globalData.userID,
      },
      method: 'post',
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    });
    SocketTask.onOpen(res => {
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      this.webSocket()
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
    })
    SocketTask.onMessage(onMessage => {
      wx.showTabBarRedDot({
        index: 1
      })
      console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', onMessage.data)
      var s = JSON.parse(onMessage.data)
      console.log('s', s)
      that.globalData.message = JSON.parse(s.data)
      //that.globalData.message =s.data
      console.log('message', that.globalData.message)

    })
  },
  globalData: {
    userInfo: null,
    sweURL:'http://111.230.110.146:8888',
    sweWxURL: 'ws://111.230.110.146:8888',
    userID:'',
    token:'',
    myUserData:{
      sex: '',
      sexofapi:'',
      nickname: '',
      mail: '',
      phoneNumber: '',
      studentID: '',
      department: '',
      dormitory:''
    },
    avatarUrl:'',
    place: [
    ],
    message: [{
      title: "ABC接受了您发布的任务",
      time: "2018/10/21 10:59"
    },
      {
        title: "EDF接受了您发布的任务",
        time: "2018/10/21 10:25"
      }
    ],
  },

  setMyUserData: function (myUserData) {     
    var that = this
    myUserData.communityID = parseInt(myUserData.communityID)
    console.log("myUserData", myUserData)
    wx.request({
      url: that.globalData.sweURL + '/saveUserInfo',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': that.globalData.token
      },
      data: {
        userID: that.globalData.userID,
        nickname: myUserData.nickname,
        sex: myUserData.sexofapi,
        phoneNumber: myUserData.phoneNumber,
        mail: myUserData.mail,
        moto: myUserData.moto,
        studentID: myUserData.studentID,
        communityID: myUserData.communityID
      },
      success: function (res) {
        if (res.data != null) {
          wx.showToast(
            {
              title: res.data.message,
              duration: 1000
            })
          if (res.data.state != 0){
            that.globalData.myUserData = myUserData; 

          }
        }
        else {
          wx.showToast(
            {
              title: "？？",
              duration: 1000
            })
        }
      }
    })                                                
   
  },

  addPlace: function (placeItem) {
    var that=this
    console.log("placeItem", placeItem)
    wx.request({
      url: that.globalData.sweURL + '/insertUserAddress',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': that.globalData.token
      },
      data: {
        userID: that.globalData.userID,
        address: placeItem.address,
        detailAddress: placeItem.detailAddress,
        lng: placeItem.lng,
        lat: placeItem.lat,
      },
      success: function (res) {
        if (res.data != null) {
          wx.showToast(
            {
              title: res.data.state+' '+res.data.message,
              duration: 1000
            })
          if (res.data.state != 0) {
            that.globalData.place.push(placeItem)     
          }
        }
        else {
          wx.showToast(
            {
              title: "？？",
              duration: 1000
            })
        }
      }
    })
                   
  },

})