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
    items: [
      { value: '1', name: '代办' },
      { value: '2', name: '交易' },
      { value: '3', name: '问卷' },
      { value: '4', name: '其他' },
    ],
    item2: [
      { value: '1', type: '赏金', name:'money', description: '请输入赏金数量'},
      { value: '2', type: '其他', name:'thing', description: '请输入其他酬劳内容'},
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
    this.data.aa = e.detail.value;
    console.log(this.data.aa);
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