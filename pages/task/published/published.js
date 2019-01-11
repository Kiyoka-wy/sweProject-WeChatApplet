var app = getApp();

Page({
  data: {
    releaserID:0,
    currentData: 0,
    noacc_tasks: [],
    acc_tasks: []

  },

  onLoad: function (options) {
    this.setData({
      releaserID: options.releaserID
    });
    //console.log("userid" + this.data.releaserID)
    var that = this
    wx.request({                     //已发布 未被接受的任务
      url: app.globalData.sweURL + '/getUnacceptedTasksByID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        releaserID: this.data.releaserID,
      },
      success: function (res) {
        console.log("返回数据", res.data.data)

        that.setData({
          noacc_tasks: res.data.data
        })
        console.log("任务列表", res.data.data)
      }
    })

    wx.request({                 //已发布 已被接受的任务
      url: app.globalData.sweURL + '/getAcceptedTasksByID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        releaserID: this.data.releaserID,
      },
      success: function (res) {
        console.log("返回数据", res.data.data)

        that.setData({
          acc_tasks: res.data.data
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