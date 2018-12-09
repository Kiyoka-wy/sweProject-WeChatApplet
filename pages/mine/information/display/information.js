var app = getApp()

Page({
  data:{
    nickname:"",
    sex:"",
    phoneNumber:"",
    mail:"",
    studentID:"",
    department:""
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: '',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      data: {
        userID: 14,
      },
      success: function (res) {
        if (res.data != null) {
          that.setData(
            {
              nickname: res.data.nickname,
              sexArray: res.data.sex,
              phoneNumber: res.data.phoneNumber,
              mail: res.data.mail,
              studentID: res.data.studentID,
              department: res.data.department
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
  }

})