// pages/mine/edit/edit.js

var Utils = require("../../../../utils/util.js");
var app = getApp()

Page({
  data: {
    sexItems: [
      { value: '男', checked: false},
      { value: '女', checked: false},
    ],
    myUserData: {
      sex: '',
      nickname: '',
      mail: '',
      phoneNumber: '',
      studentID: '',
      department: ''
    }

  },
  sexRadioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
   // this.data.myUserData.sex=e.detail.value
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('this.data数据为：',this.data)
    //app.globalData.myUserData = e.detail.value
    var submitdata=e.detail.value
    if (submitdata.sex == '男') submitdata.sexofapi='1'
    else if (submitdata.sex == '女') submitdata.sexofapi = '2'
    console.log('submitdata数据为：', submitdata)
    app.setMyUserData(submitdata)
  
  },

  onShow: function () {//这里从全局更新原来的个人信息
    this.setData({
      myUserData: app.globalData.myUserData
    })
    if (this.data.myUserData.sex=='男'){
      this.data.sexItems[0].checked = true
      this.data.sexItems[1].checked = false

    }
    else if (this.data.myUserData.sex == '女'){
      this.data.sexItems[0].checked = false
      this.data.sexItems[1].checked = true
    }
    this.setData({
      sexItems: this.data.sexItems
    })
    console.log('this.data数据为：',this.data)
   
   
  },
})