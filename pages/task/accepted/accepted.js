var app = getApp();

Page({
  data: {
    accepterID:0,
    currentData: 0,
    tasks:[
      {
        taskID:"",
        title: "",
        fromLocation: "",
        TimeLimit: ""
      },
      {
        taskID: "002",
        title: "我是任务的标题2",
        fromLocation: "我是任务的交付地点2",
        TimeLimit: "6小时"
      }
    ]
    
  },

  onLoad: function (options) {
    this.setData({
      accepterID: options.accepterID
    });
    var that = this
    wx.request({
      url: app.globalData.sweURL + '/getTasksByAccepterID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        accepterID: this.data.accepterID,
      },
      success: function (res) {
        if (res.data != null) {
          that.setData(
            {
              "tasks[0].taskID": res.data.taskList[0].taskID,
              "tasks[0].title": res.data.taskList[0].title,
              "tasks[0].fromLocation": res.data.taskList[0].fromLocation,
              "tasks[0].TimeLimit": res.data.taskList[0].leftHours +'小时'
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