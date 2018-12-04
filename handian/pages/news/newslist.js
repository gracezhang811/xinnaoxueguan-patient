// pages/news/newslist1.js

const con = require('../../utils/const.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['发病因素', '注意事项', '预防策略', "粉碎流言", "疾病解析"],
    currentTab: 0,
    token: "",
    objectArray: [],
    nextpageurl: "",
  },

  getnewsdata: function (token, currenttag) {
    var that = this;
    var theurl = con.EDUURL + con.EDUInfoList + "&category_id=12" + "&tags=" + currenttag;
    console.log('newslist url is' + theurl);
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

  //响应点击导航栏
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
    });
    var tabnum = e.currentTarget.dataset.idx;
    var currenttag = this.data.navbar[tabnum];
    this.getnewsdata(this.data.token, currenttag); 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('currentTab = ' + this.data.currentTab);
    var that = this;
    that.setData({
      currentTab: 0,
    });
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        that.setData({
          token: res.data,
        });
        that.getnewsdata(res.data, "发病因素");
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  bindNewsItem: function (e) {
    var newsid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'newsdetail?id=' + newsid
    })
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
    wx.showNavigationBarLoading();
    var tabnum = this.data.currentTab;
    var currenttag = this.data.navbar[tabnum];
    this.getnewsdata(this.data.token, currenttag);
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
          'Authorization': 'Bearer ' + token,
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
            icon: "none",
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})