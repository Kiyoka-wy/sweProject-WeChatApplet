function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var rootDocment = 'https://www.itit123.cn';
function req(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'post',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

function getReq(url, data, cb) {
  wx.request({
    url: rootDocment + url,
    data: data,
    method: 'get',
    header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function (res) {
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      return typeof cb == "function" && cb(false)
    }
  })
}

// 去前后空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 提示错误信息
function isError(msg, that) {
  that.setData({
    showTopTips: true,
    errorMsg: msg
  })
}

// 清空错误信息
function clearError(that) {
  that.setData({
    showTopTips: false,
    errorMsg: ""
  })
}

function status(state) {
  var statusJson = {};
  var x = "";
  var y = "";
  var xc = "";
  var yc = "";

  switch (state) {
    case null:           //未接受
      
      y = "取消发布";
      yc = "CancelPublish";
      break;
    case "在进行":        //已接受状态
      x = "完成任务";
      xc = "CompleteTask";
      y = "取消任务";
      yc = "CancelTask";
      break;
    case "待审核":        //发布人操作
      x = "任务已完成";
      y = "任务未完成";
      break;
    case "已完成":
      x = "";
      y = "";
      break;
    case "已超时":
      x = "完成任务";
      y = "取消任务";
      break;
    case "异常":
      x = "";
      y = "";
      break;
    case "待取消":
      x = "同意取消";
      xc = "AgreeCancel";
      y = "不同意取消";
      yc = "DisagreeCancel";
      break;
  }
  statusJson.x = x;
  statusJson.y = y;
  statusJson.xc = xc;
  statusJson.yc = yc;
  return statusJson;
}


module.exports = {
  formatTime: formatTime,
  req: req,
  trim: trim,
  isError: isError,
  clearError: clearError,
  getReq: getReq,
  status: status
}

