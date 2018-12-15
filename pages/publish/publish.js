const app = getApp()

Page({
  data: {
    current: 0,
    verticalCurrent: 2,
    Dateddl: '2000-01-01',
    Timeddl: '00:00',
    DateLimit: '2000-01-01',
    TimeLimit: '00:00',
    AddressArray: [
      {address:''}
    ],
    place: '安楼208',
    dataIndex: 0,
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
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        userID: app.globalData.userID,
      },
      success: function (res) {
        if (res.data.state != 0) {
          for (let index = 0; index < 4; index++) {           //index问题
            let straddress = 'AddressArray[' + index + '].address'
            that.setData(
              {
                [straddress]: res.data[index].address,
              }
            )
          }
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
    console.log('选择的是', this.data.AddressArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      dataIndex: e.detail.value,
      place: this.data.AddressArray[e.detail.value]
    })
  },

  bindToChange: function (e) {
    console.log('选择的是', e.detail.value)
    console.log('选择的是', this.data.AddressArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      dataIndex: e.detail.value,
      place: this.data.AddressArray[e.detail.value]
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

    wx.request({
      url: app.globalData.sweURL + '/addNewTask',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        "userID": 12,
        "releaseDate": '2018/12/15 09:20:04',
        "fromLocation": this.data.dataIndex,
        "toLocation": this.data.dataIndex,
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
        console.log("回调函数：" + res.data)
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

  formReset(e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      startDate: '2000-01-01',
      startTime: '00:00',
      endDate: '2000-01-01',
      endTime: '00:00',
      dataArray: ['安楼208', 'B楼308', 'F楼', 'G107', '手动输入'],
      place: '安楼208',
      dataIndex: 0,
      money: 0
    })
  }
});