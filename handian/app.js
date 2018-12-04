//app.js
const con = require('utils/const.js');

App({


  checktoken: function (currenttoken) {
    var that = this;
    var theurl = con.EDUURL + con.EDUCourseSort;
    console.log('coursesort url is' + theurl);
    wx.request({
      url: theurl,
      data: '',
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + currenttoken,
      },
      method: 'GET',
      success: function (res) {
        console.log('success' + JSON.stringify(res));
        if (res.statusCode == 200) {
          that.refreshtoken(currenttoken);
        } else {
          that.gettokenwithoutlogin();
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res));
      },
    })
  },

  gettokenwithoutlogin: function () {
    var that = this;
    var theurl = con.EDUURL + con.EDULogin;
    console.log('gettokenwithoutlogin' + theurl);
    wx.request({
      url: theurl,
      data: {
        Authorization: 'Basic ' + (con.Client_Id + ':' + con.Client_Secret).toString('base64'),
        client_id: con.Client_Id,
        client_secret: con.Client_Secret,
        grant_type: "client_credentials"
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      success: function (res) {
        console.log('success' + JSON.stringify(res));
        if (res.statusCode == 200) {
          wx.setStorage({
            key: "token",
            data: res.data.access_token
          });
          wx.setStorage({
            key: "islogin",
            data: 0
          });
          wx.setStorage({
            key: "refresh_token",
            data: ""
          });
          wx.setStorage({
            key: "username",
            data: ""
          });
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res));
      },
    })
  },

  refreshtoken: function (currenttoken) {
    var that = this;
    var theurl = con.EDUURL + con.EDULogin;
    console.log('refreshtoken ' + theurl);
    wx.getStorage({
      key: 'refresh_token',
      success: function (res) {
        console.log('refreshtoken =  ' + res.data);
        if (res.data == "") {
          that.gettokenwithoutlogin();
        } else {
          wx.request({
            url: theurl,
            data: {
              refresh_token: res.data,
              client_id: con.Client_Id,
              client_secret: con.Client_Secret,
              grant_type: "refresh_token",
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + currenttoken,
            },
            method: 'POST',
            success: function (res) {
              console.log('success' + JSON.stringify(res));
              if (res.statusCode == 200) {
                wx.setStorage({
                  key: "token",
                  data: res.data.access_token
                });
                wx.setStorage({
                  key: "refresh_token",
                  data: res.data.refresh_token
                });
              }
            },
            fail: function (res) {
              console.log('failed' + JSON.stringify(res));
            },
          })
        }

      },
      failed: function (res) {
        console.log("load refresh token failed");
        that.gettokenwithoutlogin();
      }
    });
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log("app.js-onLaunch")

    //wx.setStorageSync('token', "")
    
    // 登录
    /*
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
*/
  },

  onShow: function(){

  },

  globalData: {
    userInfo: null
  }
})