var app = getApp();

Page({
  data: {
    releaserID:0,
    currentData: 0,
    noacc_tasks: [
      {
        taskID: "",
        title: "",
        fromLocation: "",
        Timeddl: ""
      }
    ],
    acc_tasks: [
      {
        taskID: "",
        title: "",
        fromLocation: "",
        Timeddl: ""
      }
    ]

  },

  onLoad: function (options) {
    this.setData({
      releaserID: options.releaserID
    });
    var that = this
    wx.request({
      url: app.globalData.sweURL + '/getUnacceptedTasksByID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        releaserID: this.data.releaserID,
      },
      success: function (res) {
        if (res.data != null) {
          that.setData(
            {
              "noacc_tasks[0].taskID": res.data.taskList[0].taskID,
              "noacc_tasks[0].title": res.data.taskList[0].title,
              "noacc_tasks[0].fromLocation": res.data.taskList[0].from
            }
          )
        }
        else {
          wx.showToast(
            {
              title: "??",
              duration: 1000
            })
        }
      }
    })

    wx.request({
      url: app.globalData.sweURL + '/getAcceptedTasksByID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        //releaserID: this.data.releaserID,
        releaserID: 14,//测试
      },
      success: function (res) {
        if (res.data != null) {
          for (let index = 0; index < 3; index++) {           //index问题
            let strtaskID = 'acc_tasks[' + index + '].taskID'
            let strtitle = 'acc_tasks[' + index + '].title'
            let strfromLocation = 'acc_tasks[' + index + '].fromLocation'
            
            that.setData(
              {
                [strtaskID]: res.data.taskList[index].taskID,
                [strtitle]: res.data.taskList[index].title,
                [strfromLocation]: res.data.taskList[index].from,
                /*
                "acc_tasks[0].taskID": res.data.taskList[0].taskID,
                "acc_tasks[0].title": res.data.taskList[0].title,
                "acc_tasks[0].fromLocation": res.data.taskList[0].from*/
              }
            )
          }
        }
        else {
          wx.showToast(
            {
              title: "??",
              duration: 1000
            })
        }
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