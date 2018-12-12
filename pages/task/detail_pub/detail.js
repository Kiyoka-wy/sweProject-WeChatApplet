// pages/task/detail_pub/detail.js
Page({
  data: {
    taskID: 0,
    title: 0,
    content: "我是任务的内容",
    fromLocation: "任务执行地点",
    toLocation: "任务交付的地点",
    HideContent: "任务隐藏的字段啊",
    targetTime: 0,
    clearTimer: false
  },

  onLoad: function (options) {
    this.setData({
      targetTime: new Date().getTime() + 6430000,
      title: options.title
    })
  }
});
