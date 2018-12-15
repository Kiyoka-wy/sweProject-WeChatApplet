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
      }
    ]
    
  },

  onLoad: function (options) {
    this.setData({
      accepterID: options.accepterID,
    });
    var that = this
    wx.request({
      url: app.globalData.sweURL + '/getTasksByAccepterID',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        //accepterID: this.data.accepterID,
        accepterID: 15,
      },

      success: function (res) {
        if (res.data != null) {
          for (let index = 0; index < 1; index++) {       //index问题
            let strtaskID = 'tasks[' + index + '].taskID'
            let strtitle = 'tasks[' + index + '].title'
            let strfromLocation = 'tasks[' + index + '].fromLocation'
            let strTimeLimit = 'tasks[' + index + '].TimeLimit'
            that.setData(
              {
                [strtaskID]: res.data.taskList[index].taskID,
                [strtitle]: res.data.taskList[index].title,
                [strfromLocation]: res.data.taskList[index].from,
                [strTimeLimit]: res.data.taskList[index].leftHours + '小时',/*
                "tasks[index].taskID": res.data.taskList[index].taskID,
                "tasks[index].title": res.data.taskList[index].title,
                "tasks[index].fromLocation": res.data.taskList[index].from,
                "tasks[index].TimeLimit": res.data.taskList[index].leftHours + '小时'*/
              }
            )
          }
          /*
          that.setData(
            {
              "tasks[0].taskID": res.data.taskList[0].taskID,
              "tasks[0].title": res.data.taskList[0].title,
              "tasks[0].fromLocation": res.data.taskList[0].from,
              "tasks[0].TimeLimit": res.data.taskList[0].leftHours +'小时'
            }
          )*/
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