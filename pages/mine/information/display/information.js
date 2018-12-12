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

//下面的暂时弃用
    nickname:"",
    sex:"",
    phoneNumber:"",
    mail:"",
    studentID:"",
    department:""
  },

  onShow: function () {
    this.setData({
      myUserData: app.globalData.myUserData,
    })
    
    /*
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
    */
  }

})