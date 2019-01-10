Page({
  data: {
    imgheights: [],
    current: 0,
    imgwidth: 750,
    imgUrls: [
      '../../imgs/tutorial/1.png',
      '../../imgs/tutorial/2.png',
      '../../imgs/tutorial/3.png',
      '../../imgs/tutorial/4.png',
      '../../imgs/tutorial/5.png'
    ],
  },

  imageLoad: function (e) {
    //获取图片真实宽度
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      src = [],
      //宽高比
      ratio = imgwidth / imgheight;
    //console.log(e.target.dataset['src'])
    src.push(e.target.dataset['src'])
    //console.log(src)
    //计算的高度值
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight
    var imgheights = this.data.imgheights
    //把每一张图片的高度记录到数组里
    imgheights.push(imgheight)
    this.setData({
      imgheights: imgheights,
    })
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    })
  },

})