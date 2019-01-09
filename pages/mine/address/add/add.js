// pages/mine/address/add/add.js
var Utils = require("../../../../utils/util.js");
var app = getApp()

Page({

  data: {
    placeItem: {
      address: "   点击添加地址",
      detailAddress: ""
    },

  },

  onChangeAddress: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.data.placeItem.address = res.name,
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
  },

  insertButton: function () {
    wx.request({
      url: '',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
    data: {
      userID: this.data.userID,
      address: this.data.address,
      detailAddress: this.data.detailAddress
    },
    success: function (res) {
      console.log(res.data)
        if (res.data.state) {
        wx.showToast(
          {
            title: res.data.message,
            duration: 1000
          })
      }
      else {
        wx.showToast(
          {
            title: res.data.message,
            duration: 1000
          })
      }
    }
  })
  
},

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.address != '' ){
      app.addPlace(e.detail.value)
    }

  },

})