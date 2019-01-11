var app = getApp();

Page({
  data: {
    accepterID:0,
    currentData: 0,
    tasks:[]
    
  },

  onLoad: function (options) {
    this.setData({
      accepterID: options.accepterID,
    });
    //console.log("userid" + this.data.accepterID)
    var that = this
    wx.request({
      url: app.globalData.sweURL + '/getTasksByAccepterID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        accepterID: this.data.accepterID,
      },

      success: function (res) {
        console.log("返回数据", res.data.data)

        that.setData({
          tasks: res.data.data
        })
        console.log("任务列表", res.data.data)

        }
    })

  },  

  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;

    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }
})