
var app = getApp()

Page({
  data: {
    place:[
    ]
    
  },

  onLoad: function (options) {
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
              address: res.data.addressList[0].address,
              detailAddress: res.data.addressList[0].detailAddress
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