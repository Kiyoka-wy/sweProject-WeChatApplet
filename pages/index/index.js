//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  icons: [
    [
      {
        id: 1,
        img: '/imgs/index/icon_1.jpg',
        name: '美食',
        url: ''
      },
      {
        id: 2,
        img: '/imgs/index/icon_2.jpg',
        name: '超市',
        url: ''
      },
      {
        id: 3,
        img: '/imgs/index/icon_3.jpg',
        name: '鲜果购',
        url: ''
      },
      {
        id: 4,
        img: '/imgs/index/icon_4.jpg',
        name: '下午茶',
        url: ''
      },
      {
        id: 5,
        img: '/imgs/index/icon_5.jpg',
        name: '正餐优选',
        url: ''
      },
      {
        id: 6,
        img: '/imgs/index/icon_6.jpg',
        name: '外卖专送',
        url: ''
      },
      {
        id: 7,
        img: '/imgs/index/icon_7.jpg',
        name: '饮品站',
        url: ''
      },
      {
        id: 8,
        img: '/imgs/index/icon_8.jpg',
        name: '小吃馆',
        url: ''
      }
    ],
    [
      {
        id: 9,
        img: '/imgs/index/icon_9.jpg',
        name: '新商家',
        url: ''
      },
      {
        id: 10,
        img: '/imgs/index/icon_10.jpg',
        name: '免配送费',
        url: ''
      },
      {
        id: 11,
        img: '/imgs/index/icon_11.jpg',
        name: '鲜花蛋糕',
        url: ''
      },
      {
        id: 12,
        img: '/imgs/index/icon_12.jpg',
        name: '名气餐厅',
        url: ''
      },
      {
        id: 13,
        img: '/imgs/index/icon_13.jpg',
        name: '异国料理',
        url: ''
      },
      {
        id: 14,
        img: '/imgs/index/icon_14.jpg',
        name: '家常菜',
        url: ''
      },
      {
        id: 15,
        img: '/imgs/index/icon_15.jpg',
        name: '能量西餐',
        url: ''
      },
      {
        id: 16,
        img: '/imgs/index/icon_16.jpg',
        name: '无辣不欢',
        url: ''
      }
    ]
  ],

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
