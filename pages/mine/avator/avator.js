const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    photos: "",
    def: "../../../imgs/avatar.jpg"
  },

  /**
   * 选择照片
   */
  chooseImg: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          photos: tempFilePaths
        })
        console.log(that.data.photos)
      }
    })
  },

  /**
   * 上传照片
   */
  uploadImg: function () {
    var that = this
    wx.uploadFile({
      url: 'http://localhost:8080/setUserPic', 
      filePath: that.data.photos[0],
      name: 'pic',
      formData: {
        'userID': app.globalData.userID
      },
      success: function (res) {
        var data = res.data
        console.log(data)
        wx.showToast({
          title: "上传成功！"
        })
      }
    })
  },

  
})


