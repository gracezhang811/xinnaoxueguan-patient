// pages/course/videoplay.js
const con = require('../../utils/const.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
   video_unique: "",
   leurl:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      video_unique: options.video_unique
    })
    console.log('video_unique id = ' + this.data.video_unique);
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
      key: 'username',
      success: function (res) {
        console.log('username = ' + res.data);
        var mainurl = "https://yuntv.letv.com/bcloud.html";
        that.setData({
          leurl: mainurl + "?uu=" + con.LESHI_UUID + "&vu=" + that.data.video_unique + "&autoplay=1" + "&payer_name=" + res.data,
        });
        console.log('leurl = ' + that.data.leurl);
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