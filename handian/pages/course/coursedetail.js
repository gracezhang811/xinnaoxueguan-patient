// pages/course/coursedetail.js
const con = require('../../utils/const.js');
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['课时列表', '课程介绍'],
    currentTab: 0,
    courseid: '',
    token: "",
    cover_url:"",
    course_name:"",
    objectArray: [],
    courseinfo:"",
    isjoin: 0,
    firstperiod: "",
  },

  getCourseDetail: function (token) {
    var that = this;
    var theurl = con.EDUURL + con.EDUCourseDetail + that.data.courseid + "/?with_joined=1";
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
          that.setData({
            cover_url: res.data.cover_url,
            course_name: res.data.name,
            courseinfo: res.data.intro,
            //courseinfo: res.data.detail,
            isjoin: res.data.joined,
          });
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
  },

  getPeriodList: function (token) {
    var that = this;
    var theurl = con.EDUURL + con.EDUCoursePeriodList + that.data.courseid;
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
          //console.log('success' + JSON.stringify(res));
          that.setData({
            objectArray: res.data.results,
            firstperiod: res.data.results[0].video_unique,
          });
          console.log('success' + JSON.stringify(that.data.objectArray[0]));
        }
      },
      fail: function (res) {
        console.log('failed' + JSON.stringify(res));
      },
    })
  },

  joincourse: function (currenttoken, courseid) {
    var that = this;
    var theurl = con.EDUURL + con.EDUJoinCourse;
    theurl = util.formaturl(theurl, [courseid]);
    console.log(theurl);
    wx.request({
      url: theurl,
      data: {
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + currenttoken,
      },
      method: 'POST',
      success: function (res) {
        console.log('success' + JSON.stringify(res));
        if (res.statusCode == 200) {
          wx.showToast({
            title: '加入课程成功',
            icon: 'success',
            duration: 2000,
          });
          that.setData({
            isjoin: 1,
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
    this.setData({
      courseid:options.id,
      currentTab: 0,
      isjoin: 0,
    })
    console.log('course id = ' + this.data.courseid);
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
    var theurl = con.EDUURL + con.EDUCourseDetail + that.data.courseid + "/?with_joined=1";
    var currenttoken = "";
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log('token = ' + res.data);
        currenttoken = res.data;
        that.setData({
          token: currenttoken,
        });
        that.getCourseDetail(currenttoken);
        that.getPeriodList(currenttoken);
      }
    });
  },

  bindPeriodItem: function (e) {
    wx.getStorage({
      key: 'islogin',
      success: function (res) {
        if(res.data == 1){
          var video_unique = e.currentTarget.dataset.id;
          console.log("user login");
          wx.navigateTo({
            url: 'videoplay1?video_unique=' + video_unique
          })
        }else{
          console.log("user not login");
          wx.navigateTo({
            url: '../index/login'
          });
        }
      },
      failed: function(res){
        console.log("user not login");
        wx.navigateTo({
          url: '../index/login'
        });
      }
    });
  },

  bindJoinCourse: function (e) {
    var that = this;
    wx.getStorage({
      key: 'islogin',
      success: function (res) {
        if (res.data == 1) {
          that.joincourse(that.data.token, that.data.courseid);
        } else {
          console.log("user not login");
          wx.navigateTo({
            url: '../index/login'
          });
        }
      },
      failed: function (res) {
        console.log("user not login");
        wx.navigateTo({
          url: '../index/login'
        });
      }
    });
  },


  bindPlayCourse: function (e) {
    var that = this;
    wx.getStorage({
      key: 'islogin',
      success: function (res) {
        if (res.data == 1) {
          var video_unique = that.data.firstperiod;
          console.log("user login");
          wx.navigateTo({
            url: 'videoplay1?video_unique=' + video_unique
          });
        } else {
          console.log("user not login");
          wx.navigateTo({
            url: '../index/login'
          });
        }
      },
      failed: function (res) {
        console.log("user not login");
        wx.navigateTo({
          url: '../index/login'
        });
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