var util = require('../../../utils/util.js');
var app = getApp();

Page({
  
  data: {
    showTopTips: false,
    errorMsg: "",
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    });
  },

  formSubmit: function (e) {
    
    // form 表单取值，格式 e.detail.value.name(name为input中自定义name值) ；使用条件：需通过<form bindsubmit="formSubmit">与<button formType="submit">一起使用
    var account = e.detail.value.account;
    var password = e.detail.value.password;
   
    var that = this;
    // 判断账号是否为空
    if ("" == util.trim(account)) {
      util.isError("账号不能为空", that);
      return;
    } else {
      util.clearError(that);/*
      app.ajax.req('/register/checkLoginName', {
        "loginName": account
      }, function (res) {
        if (!res) {
          util.isError("账号已经被注册过", that);
          return;
        }
      });*/
    }

    // 判断密码是否为空
    if ("" == util.trim(password)) {
      util.isError("密码不能为空", that);
      return;
    } else {
      util.clearError(that);
    }
    
    // 验证都通过了执行登录方法
    wx.request({
      url: 'http://localhost:8080/loginByPhone',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        phoneNumber: account,
        password: password
      },
      success: function (res) {
        if (res.data.state) {
          wx.showModal(
            {
              title: '登录状态',
              content: res.data.message,
              duration: 1000,
              success: function (res) {
                if (res.confirm) {
                  // 点击确定后跳转首页并关闭当前页面
                  wx.switchTab({
                    url: '../../index/index'
                  })
                }
              }
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

  }
})
