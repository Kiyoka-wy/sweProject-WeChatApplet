
var Utils = require("../../../../utils/util.js");
var app = getApp()

Page({

  data: {
    dormitory: {
      address: "",
      detailAddress: ""
    }
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },


  insertButton: function () {
    wx.request({
      url: '',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
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

  onShow: function () {
    this.setData({
      dormitory: app.globalData.dormitory,
    })
    console.log("宿舍楼", this.data.dormitory)
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    if (e.detail.value.address != '' && e.detail.value.detailAddress != '') {
      app.setDormitory(e.detail.value)
    }
  },
 
 })