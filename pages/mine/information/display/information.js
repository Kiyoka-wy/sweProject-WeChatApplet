var app = getApp()

Page({
  data:{
  myUserData: {
      sex: '',
      nickname: '',
      mail: '',
      phoneNumber: '',
      studentID: '',
      department: ''
    },
  },

  onShow: function () {
    this.setData({
      myUserData: app.globalData.myUserData,
    })
    
    /*
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
          that.setData(
            {
              'myUserData.nickname': res.data.nickname,
              'myUserData.sex': res.data.sex,
              'myUserData.phoneNumber': res.data.phoneNumber,
              'myUserData.mail': res.data.mail,
              'myUserData.studentID': res.data.studentID,
              'myUserData.department': res.data.department
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
    })
    */
  }

})