var app = getApp()

Page({
  data: {
    visible2: false,
    //小程序没有refs，所以只能用动态布尔值控制关闭
    toggle: false,
    actions: [
      {
        name: '已读',
        color: '#80848f',
        fontsize: '20',
        width: 100,
        icon: 'right',
        
      },
      {
        name: '返回',
        width: 100,
        color: '#80848f',
        fontsize: '20',
        icon: 'undo'
      }
    ],
    message:[
      {
        title:"ABC接受了您发布的任务",
        time:"2018/10/21 10:59"
      },
      {
        title: "EDF接受了您发布的任务",
        time: "2018/10/21 10:25"
      }
    ]
  },
  onLoad: function () {
    wx.showTabBarRedDot({
      index: 1
    })
  },

  handlerCloseButton() {
    this.setData({
      toggle: this.data.toggle ? false : true
    });
  },

})