Page({
  data: {
    current: 0,
    verticalCurrent: 2,
    Dateddl: '2000-01-01',
    Timeddl: '00:00',
    DateLimit: '2000-01-01',
    TimeLimit: '00:00',
    dataArray: ['安楼208', 'B楼308', 'F楼', 'G107', '手动输入'],
    place: '安楼208',
    dataIndex: 0,
    money:0,
    bonus:"",
    type:"",
    items: [
      { value: '1', name: '代办' },
      { value: '2', name: '交易' },
      { value: '3', name: '问卷' },
      { value: '4', name: '其他' },
    ],
    item2: [
      { value: '1', type: '赏金', amount:0, description: '请输入赏金数量'},
      { value: '2', type: '其他', amount:0, description: '请输入其他酬劳内容'},
    ]
  },

  handleClick() {
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
    console.log(e.detail.value);
    
  },

  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
    
  },

  bindCasPickerChange: function (e) {
    console.log('选择的是', this.data.dataArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      dataIndex: e.detail.value,
      place: this.data.dataArray[e.detail.value]
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
    console.log(e.detail.value.fromLocation)
    console.log(e.detail.value.title)
    console.log(e.detail.value.content)
    console.log(e.detail.value.Timeddl)
    console.log(e.detail.value.TimeLimit)
    console.log(e.detail.value.money)
    console.log(e.detail.value.HideContent)
    console.log(e.detail.value.item2.amount)

    var abc = new Date().getTime()
    console.log(new Date().getTime())
  

    /*
    wx.request({
      url: 'http://localhost:8080/addNewTask',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        "userID": "发布者id",
        "releaseDate": "发布时间",
        "fromLocation": e.detail.value.fromLocation,
        "toLocation": e.detail.value.toLocation,
        "type": e.detail.value.type,
        "bonousType": "任务奖励类型 积分或者其他两种选择",
        "bonousDescription": "奖励描述 只有在选择“其他”时填写",
        "title": e.detail.value.title,//任务标题
        "content": e.detail.value.content,//任务内容
        "Timeddl": e.detail.value.Timeddl,//任务截止时间
        "TimeLimit": e.detail.value.Timelimit,//任务执行限制时间 多少小时
        "money": e.detail.value.money,//赏金 在选择“积分”时填写
        "HideContent": e.detail.value.HideContent //任务隐藏字段
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
    })*/

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