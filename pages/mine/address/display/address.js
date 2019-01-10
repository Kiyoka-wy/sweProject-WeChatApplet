
var app = getApp()

Page({
  data: {
    address: '',
    detailAddress:''
  },

  onShow: function () {
    this.setData({
      place: app.globalData.place,
    })
    console.log("地址：",this.data.place)
  }

})