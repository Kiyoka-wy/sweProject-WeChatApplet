var app = getApp();

Page({
  data: {
    currentData: 0,
    tasks: [
      {
        taskID: "001",
        title: "我是任务的标题1",
        fromLocation: "我是任务的交付地点",
        Timeddl: "15：00"
      },
      {
        taskID: "002",
        title: "我是任务的标题2",
        fromLocation: "我是任务的交付地点2",
        Timeddl: "16：00"
      }
    ]

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