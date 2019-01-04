
var app = getApp()

Page({
  data: {
    dormitory :{
      address: "",
      detailAddress: ""
     }

  },

  onLoad: function (options) {
    /*
    var that = this
    wx.request({
      url: '',
      method: 'GET',
    header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Authorization': app.globalData.token
        },
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
      dormitory: app.globalData.dormitory,
    })
    console.log("宿舍楼", this.data.dormitory)
  }

})