//index.js
//获取应用实例
const app = getApp();
const util = require('../../utils/util.js')
const con = require('../../utils/const.js')

Page({
  data: {
    userName: "",
    userPwd: "",
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

  bindViewTap: function (){
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindBtnSignup: function () {
    wx.navigateTo({
      url: '../index/signup'
    });
  },

  bindBtnResetPwd: function () {
    wx.navigateTo({
      url: '../index/resetpwd'
    });
  },


  getUserInfo: function (token) {
    var that = this;
    var theurl = con.EDUURL + con.EDUGetUserInfo;
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
          console.log('success' + JSON.stringify(res));
          wx.setStorageSync("username",res.data.username);
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res));
      },
    })
  },

  bindBtnLogin: function () {
    var that = this;
    var theurl = con.EDUURL + con.EDULogin;
    console.log(theurl);
    wx.request({
      url: theurl,
      data: {
       username: this.data.userName,
       password: this.data.userPwd,
        //username: "15811284727",
       // password: "111111",
        client_id: con.Client_Id,
        client_secret: con.Client_Secret,
        grant_type: "password"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        console.log('success' + JSON.stringify(res) );
        if (res.statusCode == 200){
          wx.switchTab({
            url: '../main/mainpage'
          })
          wx.setStorageSync( "token",res.data.access_token);
          wx.setStorageSync( "refresh_token", res.data.refresh_token);
          wx.setStorageSync("islogin",1);
          that.getUserInfo(res.data.access_token);
        } else if (res.statusCode == 500) {
            wx.showToast({
              title: "登录失败，请检查网络情况",
              icon: 'none',
              duration: 2000,
            });
          }else {
          wx.showToast({
            title: res.data.error,
            icon: 'none',
            duration: 2000,
          });
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res) );
        wx.showToast({
          title: "登录失败，请检查网络情况",
          icon: 'none',
          duration: 2000,
        });
      },
    })
  },
  onLoad: function (options) {

  },

  onShow: function () {

  },

})
