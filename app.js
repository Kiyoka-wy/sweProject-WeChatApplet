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
    this.login()
    

  },

  login:function(){
    //登录,暂时用测试账号
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
              that.onLoginSuccess()
              console.log("loginByPhone:", res.data)
              console.log("token:", res.header.token)

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
        if (res.data != null) {
          that.globalData.myUserData =
            {
              nickname: res.data.nickname,
              sexofapi: res.data.sex,
              phoneNumber: res.data.phoneNumber,
              mail: res.data.mail,
              studentID: res.data.studentID,
              department: res.data.department
            }
          if (that.globalData.myUserData.sexofapi == '1') that.globalData.myUserData.sex = '男'
          else if (that.globalData.myUserData.sexofapi == '2') that.globalData.myUserData.sex = '女'
          console.log("myUserData:", that.globalData.myUserData)
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
        if (res.data != null) {
          that.globalData.place = res.data
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
/*
    wx.request({       //调用接口获取宿舍楼，未完成
      url: that.globalData.sweURL + ,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': that.globalData.token
      },
      data: {
        userID: that.globalData.userID,
      },
      success: function (res) {
        if (res.data != null) {
          this.globalData.dormitory = res
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
*/
  },
  globalData: {
    userInfo: null,
    sweURL:'http://localhost:8080',
    userID:'',
    token:'',
    myUserData:{
      sex: '',
      sexofapi:'',
      nickname: '',
      mail: '',
      phoneNumber: '',
      studentID: '',
      department: ''
    },
    avatarUrl:'',
    place: [
    ],
    dormitory: {
      address: "",
      detailAddress: ""
    }
  },

  setMyUserData: function (myUserData) {     
    var that = this
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
        //communityID: parseInt(myUserData.communityID),
       // communityID: 1
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

  setDormitory: function (dormitory) {
    this.globalData.dormitory = dormitory;                     //调用接口上传宿舍楼，未完成
  },

})