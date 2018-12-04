// pages/course/courselist_notab.js

const con = require('../../utils/const.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    currentsort: 0,
    objectArray: [],
    nextpageurl: "",
  },

  getcoursedata: function (token, sortnum) {
    var that = this;
    var theurl = con.EDUURL + con.EDUCourseList + sortnum;
    console.log('courselist url is' + theurl);
    wx.request({
      url: theurl,
      data: '',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      method: 'GET',
      success: function (res) {
        if (res.statusCode == 200) {
          that.setData({
            objectArray: res.data.results,
            nextpageurl: res.data.next,
          });
          console.log('success' + JSON.stringify(res));
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res));
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      currentsort: options.sort,
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        that.getcoursedata(res.data, that.data.currentsort);
        that.setData({
          token: res.data
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindCourseItem: function (e) {
    var courseid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'coursedetail?id=' + courseid
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    this.getcoursedata(this.data.token, this.data.currentsort);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  // 上拉加载
  onReachBottom: function (e) {
    var that = this;
    var theurl = that.data.nextpageurl;
    console.log("onReachBottom");
    if (theurl) {
      wx.showLoading({
        title: '加载中',
      });
      wx.request({
        url: theurl,
        data: '',
        header: {
          'content-type': 'application/json',
          'Authorization': 'Bearer ' + that.data.token,
        },
        method: 'GET',
        success: function (res) {
          if (res.statusCode == 200) {
            var listdata = that.data.objectArray.concat(res.data.results);
            that.setData({
              objectArray: listdata,
              nextpageurl: res.data.next,
            });
            wx.hideLoading();
            console.log('success' + JSON.stringify(res));
          }
        },
        fail: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '获取数据失败',
            icon:"none",
            duration: 2000,
          });
          console.log('failed' + JSON.stringify(res));
        },
      })
    }
    else {
      wx.showToast({
        title: '数据已加载完',
        icon: "none",
        duration: 2000,
      });
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})