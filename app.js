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

    //调用接口获取个人信息
      var that = this
      wx.request({
        url: 'http://localhost:8080/getUserInfo',
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        data: {
          userID: 22,
        },
        success: function (res) {
          if (res.data != null) {
            that.globalData.myUserData=
              {
                nickname: res.data.nickname,
                sex: res.data.sex,
                phoneNumber: res.data.phoneNumber,
                mail: res.data.mail,
                studentID: res.data.studentID,
                department: res.data.department
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

    
           /*                                                          
    this.globalData.myUserData = {                  //调用接口获取个人信息，未完成，现在是假数据
      sex: '男',
      nickname: 'nickname',
      mail: 'mail',
      phoneNumber: 'phoneNumber',
      studentID: 'studentID',
      department: 'department'
    }*/
/*
    wx.request({
      url: 'http://localhost:8080/getUserAddresses',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userID: 14,
      },
      success: function (res) {
        if (res.data != null) {
          that.setPlace(
            {
              address: res.data[0].address,
              detailAddress: res.data[0].detailAddress
            }
          )
        }
        else {
          wx.showToast(
            {
              title: "??",
              duration: 1000
            })
        }
      }
    })*/
    /*
    this.globalData.place = [                  //调用接口获取地址，未完成，现在是假数据
        {
          address: "5号楼",
          detailAddress: "303"
        },
        {
          address: "6号楼",
          detailAddress: "403"
        }
      ]*/

    this.globalData.dormitory = {                  //调用接口获取宿舍楼，未完成，现在是假数据
      address: "5号楼",
      detailAddress: "303"
    }

  },

  globalData: {
    userInfo: null,
    myUserData:{
      sex: '',
      nickname: '',
      mail: '',
      phoneNumber: '',
      studentID: '',
      department: ''
    },
    place: [
    ],
    dormitory: {
      address: "",
      detailAddress: ""
    }
  },

  setMyUserData: function (myUserData) {                                                     
    this.globalData.myUserData = myUserData;                      //调用接口上传个人信息，未完成
  },

  addPlace: function (placeItem) {
    this.globalData.place.push(placeItem)                      //调用接口上传地址，未完成
  },

  setDormitory: function (dormitory) {
    this.globalData.dormitory = dormitory;                     //调用接口上传宿舍楼，未完成
  },

})