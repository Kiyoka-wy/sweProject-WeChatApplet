// pages/task/detail/detail.js
Page({
  data: {
    taskID:0,
    title: 0,
    content: "我是任务的内容",
    fromLocation: "任务执行地点",
    toLocation: "任务交付的地点",
    HideContent: "任务隐藏的字段啊",
    limit:3,
    targetTime: 0,
    clearTimer: false
  },
  
  onLoad: function (options) {
    this.setData({
      targetTime: new Date().getTime() + 1000*60*60*this.data.limit,
      title: options.title
    })
  },

  onUnload() {
    this.setData({
      clearTimer: true
    });
  },
  myLinsterner(e) {
    this.setData({
      status: '结束'
    });
  }
});
