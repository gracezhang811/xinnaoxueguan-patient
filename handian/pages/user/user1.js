// pages/user/user1.js
// pages/user/user.js
const app = getApp();
const con = require('../../utils/const.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    iconurl: "../../images/useravatar.png",
    userphone: "",
    loginstatus: 0,
    question: "",
    objectArray: [],
    loginfo: "您尚未登录，不能直接观看视频内容，请您点击头像登录。",
  },

  bindBtnLogin: function () {
    wx.navigateTo({
      url: '../index/login'
    });
  },

  bindBtnLogout: function () {
    this.gettokenwithoutlogin();
    this.setData({
      iconurl: "../../images/useravatar.png",
      userphone: "",
    });
    wx.switchTab({
      url: '../main/mainpage'
    });
  },

  binddaluoteinfo: function () {
    wx.navigateTo({
      url: 'daluoteinfo'
    });
  },

  bindquestionInput: function (e) {
    this.setData({
      question: e.detail.value
    });
  },


  bindSendQuestion: function () {
    console.log("question = " + this.data.question);
    this.gettulinganswers(this.data.question);
  },

  gettokenwithoutlogin: function () {
    var that = this;
    var theurl = con.EDUURL + con.EDULogin;
    console.log(theurl);
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
          wx.setStorageSync("token",res.data.access_token);
          wx.setStorageSync("islogin", 0);
          wx.setStorageSync("username","");
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res));
      },
    })
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
          that.setData({
            iconurl: res.data.avatar_url,
            userphone: res.data.phone,
            loginstatus: 1,
          });
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res));
      },
    })
  },

  gettulinganswers: function (questioncontent) {
    var that = this;
    var theurl = con.tulingapiurl;
    console.log(theurl);
    var outstring = {
      "key": con.tulingapikey,
      "userid": con.tulinguserid,
      "info": questioncontent,
    };
    console.log(outstring);
    wx.request({
      url: theurl,
      data: outstring,
      header: {
        'content-type': 'application/json',
      },
      method: 'POST',
      success: function (res) {
        console.log('success' + JSON.stringify(res));
        var quesdata = that.data.objectArray;
        var ques = {
          "usericon": "../../images/user.png",
          "content": questioncontent,
        };
        quesdata.push(ques);
        var answer = {
          "usericon": "../../images/robot.png",
          "content": res.data.text,
        };
        quesdata.push(answer);
        //console.log(JSON.stringify(quesdata));
        that.setData({
          objectArray: quesdata,
          question: "",
        });
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
    var that = this;
    wx.getStorage({
      key: 'islogin',
      success: function (res) {
        if (res.data == 0) {
          that.setData({
            iconurl: "../../images/useravatar.png",
            loginstatus: 0,
          });
        } else {
          wx.getStorage({
            key: 'token',
            success: function (res) {
              that.getUserInfo(res.data);
            }
          });
        }
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