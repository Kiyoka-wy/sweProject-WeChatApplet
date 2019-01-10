// pages/mine/address/add/add.js
var Utils = require("../../../../utils/util.js");
var app = getApp()

Page({

  data: {
    placeItem: {
      address: "   点击添加地址",
      detailAddress: "",
      lng: null,
      lat: null,
    },

  },

  onChangeAddress: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.data.placeItem.address = res.name,
          that.data.placeItem.lng = res.longitude,
          that.data.placeItem.lat = res.latitude,
          that.setData({
            placeItem: that.data.placeItem
          });

      },
      fail: function (err) {
        console.log(err)

      }
    });

  },
 
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.address != '' ){
      app.addPlace(e.detail.value)
    }

  },

})