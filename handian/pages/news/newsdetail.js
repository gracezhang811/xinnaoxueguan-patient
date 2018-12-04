// pages/news/newsdetail.js

const con = require('../../utils/const.js');
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsid: "",
    newsurl: "",
  },

  getNewsDetail: function (token) {
    var that = this;
    var theurl = con.EDUURL + con.EDUInfoDetail + that.data.newsid + "/";
    wx.request({
      url: theurl,
      data: '',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      method: 'GET',
      success: function (res) {
        // console.log('success' + JSON.stringify(res));
        if (res.statusCode == 200) {
          console.log('success' + JSON.stringify(res));
          var article = res.data.content;
          WxParse.wxParse('article', 'html', article, that, 5);  
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
    this.setData({
      newsid: options.id
    })
    console.log('news id = ' + this.data.newsid);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var currenttoken = "";
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        currenttoken = res.data;
        that.getNewsDetail(currenttoken);
      }
    });
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})