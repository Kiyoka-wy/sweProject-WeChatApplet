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
    console.log('myUserData', this.data.myUserData)
  }

})