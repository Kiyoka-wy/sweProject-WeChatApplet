Page({
  onShareAppMessage() {
    return {
      title: 'form',
      path: 'page/component/pages/form/form'
    }
  },

  data: {
    startDate: '2000-01-01',
    startTime: '00:00',
    endDate: '2000-01-01',
    endTime: '00:00',
    dataArray: ['安楼208', 'B楼308', 'F楼', 'G107', '手动输入'],
    place: '安楼208',
    dataIndex: 0,
    money:0
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

  bindStartDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  bindStartTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startTime: e.detail.value
    })
  },

  bindEndDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  bindEndTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endTime: e.detail.value
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
})
