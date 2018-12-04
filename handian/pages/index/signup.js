// pages/index/signup.js

const app = getApp();
const con = require('../../utils/const.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userPwd: "",
    userRePwd: "",
    userCode: "",
    logo: "../../images/handian_logo.jpg",
  },

  //获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    });
  },

  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    });
  },

  codeInput: function (e) {
    this.setData({
      userCode: e.detail.value
    });
  },

  passWdRepeatInput: function (e) {
    this.setData({
      userRePwd: e.detail.value
    });
  },

  bindBtnSubmit: function () {
    var that = this;
    if (this.data.userPwd == this.data.userRePwd) {
      var theurl = con.EDUURL + con.EDUSignUp;
      console.log(theurl);
      var para = {
        username: that.data.userName,
        phone: that.data.userName,
        password: that.data.userPwd,
        captcha: that.data.userCode
      };
      console.log(JSON.stringify(para));
      wx.request({
        url: theurl,       
        header: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        data: para,
        success: function (res) {
          console.log('success' + JSON.stringify(res));
          if (res.statusCode == 200) {
            wx.showToast({
              title: res.data.data,
              duration: 2000,
            });
            wx.navigateBack();
          } else if (res.statusCode == 500){
            wx.showToast({
              title: "注册失败，请检查网络情况",
              icon: 'none',
              duration: 2000,
            });
          }
          else{
            wx.showToast({
              title: JSON.stringify(res.data),
              icon: 'none',
              duration: 2000,
            });
          }
        },
        fail: function (res) {
          console.log('failed' + JSON.stringify(res));
          wx.showToast({
            title: "注册失败，请检查网络情况",
            icon: 'none',
            duration: 2000,
          });
        },
      })
    } else {
      wx.showToast({
        title: '密码不一致，请重新输入',
        icon: 'none',
        duration: 2000,
      });
    }

  },

  bindBtnSendcode: function () {
    var that = this;
    var theurl = con.EDUURL + con.EDUSendCodeForReg;
    console.log(theurl);
    wx.request({
      url: theurl,
      data: {
        phone: this.data.userName,
      },
      header: {
        'content-type': 'application/json',
      },
      method: 'POST',
      success: function (res) {
        console.log('success' + JSON.stringify(res));
        if (res.statusCode == 200) {

        } else {
          wx.showToast({
            title: '获取验证码失败',
            icon: "none",
            duration: 2000,
          });
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