const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    current: 0,
    verticalCurrent: 2,
    Dateddl: '2000-01-01',
    Timeddl: '00:00',
    DateLimit: '2000-01-01',
    TimeLimit: '00:00',
    address:[],
    place1: '',
    place2: '',
    reply1: false,
    reply2: false,
    dataIndex1: 0,
    dataIndex2: 0,
    money:0,
    description:'',
    bonus:"",
    bonusType:'',
    type:"",
    amount:0,
    items: [
      { value: '代办', name: '代办' },
      { value: '其他', name: '其他' },
      { value: '交易', name: '交易(暂不支持)' },
      { value: '问卷', name: '问卷(暂不支持)' },
    ],
    item2: [
      { value: '1', type: '积分', amount:0, description: '请输入积分数量'},
      { value: '2', type: '其他', amount:'0', description: '请输入其他酬劳内容'},
    ]
  },

  onShow: function () {
    var that = this
    
    wx.request({
      url: app.globalData.sweURL + '/getUserAddresses',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        userID: app.globalData.userID,
      },
      success: function (res) {
        if (res.data.state != 0) { 
          console.log("返回数据", res.data)
          that.data.address=[]
          for (var i=0;i<res.data.length;i++){
            that.setData({
              address: that.data.address.concat(res.data[i].address + res.data[i].detailAddress)
            })
          }
          that.setData({
            address: that.data.address.concat("自定义")
          })
        }
        else {
          wx.showToast(
            {
              title: "没有地址",
              duration: 1000
            })
        }
      }
    })
  },

  handleClick(options) {
    const current = this.data.current + 1;
    this.setData({
      'current': current,
      'currentData': current
    })
  },

  bindtap1: function (e) {
    var items = this.data.items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name == this.data.aa) {
        for (var j = 0; j < items.length; j++) {
          if (items[j].checked && j != i) {
            items[j].checked = false;
          }
        }
        items[i].checked = !(items[i].checked);
      }
    }
    this.setData({
      items: items
    });
  },

  radioChange2: function (e) {
    console.log(e.detail.value)
    this.setData({
      bonusType: e.detail.value,
    })
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      type: e.detail.value
    })
    
  },

  bindFromChange: function (e) {
    console.log('选择的是', e.detail.value)
    console.log('选择的是', this.data.address[e.detail.value])
    if (e.detail.value == this.data.address.length - 1) {
      this.setData({ reply1: true })
    } else {
      this.setData({ reply1: false })
    }
    this.setData({
      dataIndex1: e.detail.value,
    })
  },

  bindToChange: function (e) {
    console.log('选择的是', e.detail.value)
    console.log('选择的是', this.data.address[e.detail.value])
    if (e.detail.value == this.data.address.length-1) {
      this.setData({ reply2: true })
    } else {
      this.setData({ reply2: false })
    }
    this.setData({
      dataIndex2: e.detail.value,
    })
  },

  bindDateddlChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Dateddl: e.detail.value
    })
  },

  bindTimeddlChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      Timeddl: e.detail.value
    })
  },
  

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log('data：', this.data)
    console.log('userID', app.globalData.userID)
    if (this.data.reply1 == true) e.detail.value.fromLocation = e.detail.value.place1
    if (this.data.reply2 == true) e.detail.value.toLocation = e.detail.value.place2
    console.log('e.detail.value', e.detail.value)
    wx.request({
      url: app.globalData.sweURL + '/addNewTask',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': app.globalData.token
      },
      data: {
        "releaser": app.globalData.userID,
        "releaseDate": util.formatTime(new Date()),
        "fromLocation": e.detail.value.fromLocation,
        "toLocation": e.detail.value.toLocation,
        "type": this.data.type,
        "bonousType": this.data.bonusType,
        "bonousDescription": e.detail.value.amount,
        "title": e.detail.value.title,
        "content": e.detail.value.content,
        "Timeddl": this.data.Dateddl + ' ' + this.data.Timeddl,
        "TimeLimit": e.detail.value.Timelimit,
        "money": e.detail.value.amount,
        "HideContent": e.detail.value.HideContent
      },
      success: function (res) {
        if (res.data.state) {
          wx.showModal(
            {
              title: '成功发布任务',
              content: res.data.message,
              duration: 1000,
              success: function (res) {
                if (res.confirm) {
                  // 点击确定后跳转首页并关闭当前页面
                  wx.switchTab({
                    url: '../index/index'
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

  },

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      startDate: '2000-01-01',
      startTime: '00:00',
      endDate: '2000-01-01',
      endTime: '00:00',
      place1: '',
      place2: '',
      reply1: false,
      reply2: false,
      dataIndex1: 0,
      dataIndex2: 0,
      money: 0
    })
  }
});