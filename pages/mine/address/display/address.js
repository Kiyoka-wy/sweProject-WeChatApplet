
var app = getApp()

Page({
  data: {
    address: '',
    detailAddress:''
  },

  onLoad: function (options) {
    /*
    var that = this
    wx.request({
      url: 'http://localhost:8080/getUserAddresses',
      method: 'GET',
      header: { 'content-type': 'application/json' },
      data: {
        userID: 14,
      },
      success: function (res) {
        if (res.data != null) {
          that.setData(
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
  },

  onShow: function () {
    this.setData({
      place: app.globalData.place,
    })
    console.log("地址：",this.data.place)
  }

})