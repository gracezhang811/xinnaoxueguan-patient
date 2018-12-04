// pages/main/mainpage.js
//获取应用实例
const app = getApp();
const con = require('../../utils/const.js');

function getnewsdata(token, tablabel, callback) {
  var theurl = con.EDUURL + "/v1/posts/?site_id=1&status=publish&kind=0&page_size=3&page=1" + "&category_id=12" + "&tags=" + tablabel;
  wx.request({
    url: theurl,
    data: '',
    header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    method: 'GET',
    success: function (res) {
      callback(res);
    },
    fail: function (res) {
      console.log('failed' + JSON.stringify(res));
    },
  })
};

function getcoursedata(token, sortnum, callback) {
  var theurl = con.EDUURL + "/v1/courses/?status=0&page_size=4&page=1&category_id=" + sortnum;
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
      callback(res);
    },
    fail: function (res) {
      console.log('failed' + JSON.stringify(res));
    },
  })
};

function getsuggestnewsdata(token, callback) {
  var theurl = con.EDUURL + "/v1/posts/?site_id=1&status=publish&page_size=30&page=1" + "&category_id=12&is_suggestion=True";
  console.log('newslist url is' + theurl);
  wx.request({
    url: theurl,
    data: '',
    header: {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    method: 'GET',
    success: function (res) {
      callback(res);
    },
    fail: function (res) {
      console.log('failed' + JSON.stringify(res));
    },
  })
};

Page({
  data: {
    token: "",
    suggestinfodata:[],
    newsdata1:[],
    coursedata:[],
    newsdata2: [],
  },

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
          that.getmainpagedata(res.data.access_token);
          wx.setStorageSync("token", res.data.access_token);
          wx.setStorageSync( "islogin", 0);
          wx.setStorageSync( "refresh_token","");
          wx.setStorageSync("username", "");
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
              that.getmainpagedata(res.data.access_token);
              if (res.statusCode == 200) {
                wx.setStorageSync("token", res.data.access_token);
                wx.setStorageSync( "refresh_token", res.data.refresh_token);
              }
            },
            fail: function (res) {
              console.log('failed' + JSON.stringify(res));
              that.gettokenwithoutlogin();
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

  getmainpagedata: function(token){
    var that = this;
    getsuggestnewsdata(token, function (res) {
      if (res.statusCode == 200) {
        that.setData({
          suggestinfodata: res.data.results,
        });
        console.log('success' + JSON.stringify(res));
      }
    });
    getnewsdata(token, "粉碎流言", function (res) {
      if (res.statusCode == 200) {
        that.setData({
          newsdata1: res.data.results,
        });
        console.log('success' + JSON.stringify(res));
      }
    });
    getnewsdata(token, "注意事项", function (res) {
      if (res.statusCode == 200) {
        that.setData({
          newsdata2: res.data.results,
        });
        console.log('success' + JSON.stringify(res));
      }
    });
    getcoursedata(token, 77, function (res) {
      if (res.statusCode == 200) {
        that.setData({
          coursedata: res.data.results,
        });
        console.log('success' + JSON.stringify(res));
      }
    });
  },

  bindMore1: function (e) {
    wx.navigateTo({
      url: '../news/newslist_single?tag=粉碎流言'
    })
  },

  bindMore2: function (e) {
    wx.navigateTo({
      url: '../course/courselist_single?sort=77'
    })
  },

  bindMore3: function (e) {
    wx.navigateTo({
      url: '../news/newslist_single?tag=注意事项'
    })
  },

  bindNewsItem: function (e) {
    var newsid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../news/newsdetail?id=' + newsid
    })
  },

  bindCourseItem: function (e) {
    var courseid = e.currentTarget.dataset.id;
    console.log('goto course id = ' + courseid);
    wx.navigateTo({
      url: '../course/coursedetail?id=' + courseid
    })
  },

  onLoad: function () {

  },

  onReady: function () {

  },

  onShow: function () {
    var that = this;
    var thetoken = wx.getStorageSync("token");
    if (thetoken) {
      that.checktoken(thetoken);
    } else {
      that.gettokenwithoutlogin();
    }

    /*
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log("load token success");
        that.checktoken(res.data);
      },
      failed: function (res) {
        console.log("load token failed");
        that.gettokenwithoutlogin();
      }
    }); 
    */
  },
})
