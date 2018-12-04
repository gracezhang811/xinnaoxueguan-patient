// pages/user/user.js
const app = getApp();
const con = require('../../utils/const.js')
const cdvasl = require('../../utils/cardiovascularRisk.js')

function log(i) {
  return Math.log(i) * Math.LOG10E;
}

function ln(i) {
  return Math.log(i);
}

function sq(i) {
  return i * i;
}

function sqr(i) {
  return Math.sqrt(i);
}


function power(x, y) {
  return Math.pow(x, y);
}

function eTo(x) {
  return Math.exp(x);
}

function fixDP(r, dps) {
  if (isNaN(r)) return "NaN";
  var msign = '';
  if (r < 0) msign = '-';
  var x = Math.abs(r);
  if (x > Math.pow(10, 21)) return msign + x.toString();
  var m = Math.round(x * Math.pow(10, dps)).toString();
  if (dps == 0) return msign + m;
  while (m.length <= dps) m = "0" + m;
  return msign + m.substring(0, m.length - dps) + "." + m.substring(m.length - dps);
}


Page({
  /**
   * 页面的初始数据
   */
  data: {
    iconurl: "../../images/useravatar.png",
    userphone: "",
    loginstatus: 0,
    loginfo: "您尚未登录，不能直接观看视频内容，请您点击头像登录。",

    cdvslintro1: "本计算器帮助您预测下列hard ASCVD（动脉硬化性心血管疾病）的十年期风险：",
    cdvslintro2:"初次非致命心肌梗死",
    cdvslintro3:"冠心病死亡",
    cdvslintro4:"致命或非致命行卒中",
    cdvslintro5: "本计算器可能会过渡预测风险(参考 Lancet reference)，如果有任何问题，请与患者详细沟通。 ",
    cdvslintro6:"风险计算主要基于对白人和非裔美国人群体的统计分析进行；",
    cdvslintro7: "对于美洲印第安人，来自南亚的亚裔美国人以及波多黎各人来说，风险评估可能偏低；",
    cdvslintro8: "对于来自东亚的亚裔美国人和一些墨西哥裔美国人来说，风险评估可能偏高。",
    
    RaceArray: [
      { name: "黑人或非裔美国人", value: "0", },
      { name: "白人", value: "1",  },
      { name: "其他人种", value: "1", },
    ],
    SexArray: [
      { name: "女", value: "0", checked: false },
      { name: "男", value: "1", checked: false },
    ],
    AgeUnitArray: [
      { name: "年", value: "1" },
      { name: "月", value: "0.0833333333333333" },
    ],
    TotalCholArray: [
      { name: "mg/dL 毫克/分升", value: "1" },
      { name: "mmol/L 毫摩尔/升", value: "38.6697602474865" },
    ],
    HDLCholArray: [
      { name: "mg/dL 毫克/分升", value: "1" },
      { name: "mmol/L 毫摩尔/升", value: "38.6697602474865" },
    ],
    BloodPressureArray: [
      { name: "Pascal 帕斯卡", value: "0.00750063755419211" },
      { name: "atm", value: "760.002100178515" },
      { name: "bar", value: "750.063755419211" },
      { name: "cmH2O", value: "0.735561538478802" },
      { name: "cmHg", value: "10" },
      { name: "ftH2O", value: "22.4199156928339" },
      { name: "gm/sqcm", value: "0.735561538478802" },
      { name: "inH2O", value: "1.86832630773616" },
      { name: "inHg", value: "25.4000840071406" },
      { name: "kPa 千帕", value: "7.50063755419211" },
      { name: "mbar", value: "0.750063755419211" },
      { name: "mmHg 毫米汞柱", value: "1" },
      { name: "psi", value: "51.7150957831416" },
      { name: "torr", value: "1" },
    ],
    HypertensionArray: [
      { name: "否", value: "0", checked: false },
      { name: "是", value: "1", checked: false },
    ],
    DiabetesArray: [
      { name: "否", value: "0", checked: false },
      { name: "是", value: "1", checked: false },
    ],
    SmokeArray: [
      { name: "否", value: "0", checked: false },
      { name: "是", value: "1", checked: false },
    ],
    DecptsArray: [
      { name: "1", value: "1" },
      { name: "2", value: "2"},
      { name: "3", value: "3"},
    ],
    ageunitindex: 0,
    cholunitindex: 0,
    hdlcholunitindex: 0,
    bloodpresunitindex: 11,
    decptsindex: 1,

    racevalue: 0,
    sexvalue: 0,
    hypertensionvalue: 0,
    diabetesvalue: 0,
    smokevalue: 0,

    ageunit:1,
    cholunit: 1,
    hdlcholunit: 1,
    bloodpresunit: 1,
    decpts:2,

    age: "",
    totalchol: "",
    hdlchol: "",
    bloodpressure: "",

    raceexist: 0,
    sexexist: 0,
    ageexist:0,
    totalcholexist: 0,
    hdlcholexist: 0,
    bloodpressureexist: 0,
    hypertensionexist: 0,
    diabetesexist: 0,
    smokeexist: 0,

    tenyearrisk: "",


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

/*
  binddaluoteinfo:function(){
    wx.navigateTo({
      url: 'daluoteinfo'
    });
  },
*/
  radioRaceChange:function(e){
    console.log("choose race, value = " + e.detail.value);
    this.setData({
      racevalue: e.detail.value,
      raceexist: 1,
    });
  },

  radioSexChange: function (e) {
    console.log("choose sex, value = " + e.detail.value);
    this.setData({
      sexvalue: e.detail.value,
      sexexist: 1,
    });
  },

  bindageinput: function (e) {
    console.log("age value = " + e.detail.value); 
    if (!e.detail.value) {
      cdvasl.alerterror("请输入数值。");
      this.setData({
        age: "",
        ageexist: 0,
      });
    } else if ( isNaN(e.detail.value)){
      cdvasl.alerterror("年龄格式不正确，只能输入数字0-9和小数点");
      this.setData({
        age: "",
        ageexist: 0,
      });
    }; 
    var Age = parseFloat(e.detail.value) * parseFloat(this.data.ageunit);
    if (Age > 79){
      cdvasl.alerterror("年龄最大值为79岁。");
      this.setData({
        age: "",
        ageexist: 0,
      });
    } else if (Age < 20) {
      cdvasl.alerterror("年龄最小值为20岁。");
      this.setData({
        age: "",
        ageexist: 0,
      });
    }else{
      this.setData({
        age: e.detail.value,
        ageexist : 1,
      });
    }
  },

  bindtotalcholinput: function (e) {
    console.log("total chol value = " + e.detail.value);
    if (!e.detail.value){
      cdvasl.alerterror("请输入数值。");
      this.setData({
        totalchol: "",
        totalcholexist: 0,
      });
    }else if (e.detail.value && isNaN(e.detail.value)) {
      cdvasl.alerterror("总胆固醇格式不正确，只能输入数字0-9和小数点");
      this.setData({
        totalchol: "",
        totalcholexist: 0,
      });
    };

    var Total_Cholesterol = parseFloat(e.detail.value) * parseFloat  (this.data.cholunit);
    if (Total_Cholesterol < 130) {
      cdvasl.alerterror("总胆固醇最小值为130 mg/dL，如果您使用其他单位，请先选择单位。");
      this.setData({
        totalchol: "",
        totalcholexist: 0,
      });
    } else if (Total_Cholesterol >  320) {
      cdvasl.alerterror("总胆固醇最大值为320 mg/dL，如果您使用其他单位，请先选择单位。。");
      this.setData({
        totalchol: "",
        totalcholexist: 0,
      });
    } else {
      this.setData({
        totalchol: e.detail.value,
        totalcholexist: 1,
      });
    }
  },

  bindhdlcholinput: function (e) {
    console.log("hdl chol value = " + e.detail.value);
    if (!e.detail.value) {
      cdvasl.alerterror("请输入数值。");
      this.setData({
        hdlchol: "",
        hdlcholexist: 0,
      });
    } else if (isNaN(e.detail.value)) {
      cdvasl.alerterror("高密度脂蛋白胆固醇格式不正确，只能输入数字0-9和小数点");
      this.setData({
        hdlchol: "",
        hdlcholexist: 0,
      });
    };

    var HDL_Cholesterol = parseFloat(e.detail.value) * parseFloat(this.data.hdlcholunit);
    if (HDL_Cholesterol < 20) {
      cdvasl.alerterror("高密度脂蛋白胆固醇最小值为20 mg/dL，如果您使用其他单位，请先选择单位。");
      this.setData({
        hdlchol: "",
        hdlcholexist: 0,
      });
    } else if (HDL_Cholesterol > 100) {
      cdvasl.alerterror("高密度脂蛋白胆固醇最大值为100 mg/dL，如果您使用其他单位，请先选择单位。");
      this.setData({
        hdlchol: "",
        hdlcholexist: 0,
      });
    } else {
      this.setData({
        hdlchol: e.detail.value,
        hdlcholexist: 1,
      });
    }    
  },

  bindbloodpressureinput: function (e) {
    console.log("blood pressure value = " + e.detail.value);
    if (!e.detail.value) {
      cdvasl.alerterror("请输入数值。");
      this.setData({
        bloodpressure: "",
        bloodpressureexist: 0,
      });
    } else if (isNaN(e.detail.value)) {
      cdvasl.alerterror("收缩压格式不正确，只能输入数字0-9和小数点");
      this.setData({
        bloodpressure: "",
        bloodpressureexist: 0,
      });
    };
    
    var Systolic_Blood_Pressure = parseFloat(e.detail.value) * parseFloat(this.data.bloodpresunit);
    if (Systolic_Blood_Pressure < 90) {
      cdvasl.alerterror("收缩压最小值为90 mmHg，如果您使用其他单位，请先选择单位。");
      this.setData({
        bloodpressure: "",
        bloodpressureexist: 0,
      });
    } else if (Systolic_Blood_Pressure > 200) {
      cdvasl.alerterror("收缩压最大值为200 mmHg，如果您使用其他单位，请先选择单位。");
      this.setData({
        bloodpressure: "",
        bloodpressureexist: 0,
      });
    } else {
      this.setData({
        bloodpressure: e.detail.value,
        bloodpressureexist: 1,
      });
    }    

  },

  bindAgeUnitChange: function(e){
    var value = this.data.AgeUnitArray[e.detail.value].value ;
    console.log("choose age unit, value = " + value);
    this.setData({
      ageunit: value,
      ageunitindex: e.detail.value,
    });
  },

  bindTotalCholUnitChange: function (e) {
    var value = this.data.TotalCholArray[e.detail.value].value;
    console.log("choose TotalChol unit, value = " + value);
    this.setData({
      cholunit: value,
      cholunitindex: e.detail.value,
    });
  },

  bindHDLCholUnitChange: function (e) {
    var value = this.data.HDLCholArray[e.detail.value].value;
    console.log("choose HDL Chol unit, value = " + value);
    this.setData({
      hdlcholunit: value,
      hdlcholunitindex: e.detail.value,
    });
  },

  bindBloodPressureUnitChange: function (e) {
    var value = this.data.BloodPressureArray[e.detail.value].value;
    console.log("choose Blood Pressure unit, value = " + value);
    this.setData({
      bloodpresunit: value,
      bloodpresunitindex: e.detail.value,
    });
  },

  radioHypertensionChange: function (e) {
    console.log("choose Hypertension or not, value = " + e.detail.value);
    this.setData({
      hypertensionvalue: e.detail.value,
      hypertensionexist: 1,
    });
  },

  radioDiabetesChange: function (e) {
    console.log("choose Diabetes or not, value = " + e.detail.value);
    this.setData({
      diabetesvalue: e.detail.value,
      diabetesexist: 1,
    });
  },

  radioSmokeChange: function (e) {
    console.log("choose smoke or not, value = " + e.detail.value);
    this.setData({
      smokevalue: e.detail.value,
      smokeexist: 1,
    });
  },

  bindDecptsChange: function (e) {
    var value = this.data.DecptsArray[e.detail.value].value;
    console.log("choose decpts unit, value = " + value);
    this.setData({
      decpts: value,
      decptsindex: e.detail.value,
    });
  },

  bindsubmitcdvsl: function(){
    if(this.checkcardiovasulardata() > 0){
      this.ACCAHA2013_fx();
    }else{
      cdvasl.alerterror("还有信息没有输入，请填写全部信息。");
    }
  },

  checkcardiovasulardata: function(){
    var temp = this.data.raceexist + this.data.sexexist + this.data.ageexist + this.data.totalcholexist + this.data.hdlcholexist + this.data.bloodpressureexist + this.data.hypertensionexist + this.data.diabetesexist + this.data.smokeexist;
    console.log(this.data.raceexist);
    console.log(this.data.sexexist);
    console.log(this.data.ageexist);
    console.log(this.data.totalcholexist);
    console.log(this.data.hdlcholexist);
    console.log(this.data.bloodpressureexist);
    console.log(this.data.hypertensionexist);
    console.log(this.data.diabetesexist);
    console.log(this.data.smokeexist);

    if (temp == 9){
      console.log("all info input");
      return 1;
    }else{
      console.log("not all input has value");
      return -1;
    }
  },

  ACCAHA2013_fx: function(){
    var C_Age = 0;
    var C_Sq_Age = 0; 
    var C_Total_Chol = 0; 
    var C_Age_Total_Chol = 0; 
    var C_HDL_Chol = 0; 
    var C_Age_HDL_Chol = 0; 
    var C_On_Hypertension_Meds = 0; 
    var C_Age_On_Hypertension_Meds = 0; 
    var C_Off_Hypertension_Meds = 0; 
    var C_Age_Off_Hypertension_Meds = 0;
    var  C_Smoker = 0; 
    var C_Age_Smoker = 0;
    var C_Diabetes = 0; 
    var S10 = 0;
    var Mean_Terms = 0;

    if (this.data.sexvalue == 0) {
      if (this.data.racevalue == 0) {
        C_Age = 17.114; 
        C_Sq_Age = 0; 
        C_Total_Chol = 0.94; 
        C_Age_Total_Chol = 0; 
        C_HDL_Chol = -18.92; 
        C_Age_HDL_Chol = 4.475; 
        C_On_Hypertension_Meds = 29.291; 
        C_Age_On_Hypertension_Meds = -6.432; 
        C_Off_Hypertension_Meds = 27.82; 
        C_Age_Off_Hypertension_Meds = -6.087; 
        C_Smoker = 0.691; 
        C_Age_Smoker = 0; 
        C_Diabetes = 0.874; 
        S10 = 0.9533; 
        Mean_Terms = 86.61;
      }else if (this.data.racevalue == 1) {
        C_Age = -29.799; 
        C_Sq_Age = 4.884; 
        C_Total_Chol = 13.54; 
        C_Age_Total_Chol = -3.114; 
        C_HDL_Chol = -13.578; 
        C_Age_HDL_Chol = 3.149; 
        C_On_Hypertension_Meds = 2.019;
        C_Age_On_Hypertension_Meds = 0; 
        C_Off_Hypertension_Meds = 1.957; 
        C_Age_Off_Hypertension_Meds = 0; 
        C_Smoker = 7.574; 
        C_Age_Smoker = -1.665; 
        C_Diabetes = 0.661; 
        S10 = 0.9665; 
        Mean_Terms = -29.18;
      };
    }else if (this.data.sexvalue == 1) {
      if (this.data.racevalue == 0) {
        C_Age = 2.469; 
        C_Sq_Age = 0; 
        C_Total_Chol = 0.302;
        C_Age_Total_Chol = 0; 
        C_HDL_Chol = -0.307; 
        C_Age_HDL_Chol = 0; 
        C_On_Hypertension_Meds = 1.916; 
        C_Age_On_Hypertension_Meds = 0; 
        C_Off_Hypertension_Meds = 1.809; 
        C_Age_Off_Hypertension_Meds = 0; 
        C_Smoker = 0.549; 
        C_Age_Smoker = 0; 
        C_Diabetes = 0.645; 
        S10 = 0.8954; 
        Mean_Terms = 19.54;
      }else if (this.data.racevalue == 1) {
        C_Age = 12.344; 
        C_Sq_Age = 0; 
        C_Total_Chol = 11.853; 
        C_Age_Total_Chol = -2.664; 
        C_HDL_Chol = -7.99; 
        C_Age_HDL_Chol = 1.769; 
        C_On_Hypertension_Meds = 1.797; 
        C_Age_On_Hypertension_Meds = 0; 
        C_Off_Hypertension_Meds = 1.764; 
        C_Age_Off_Hypertension_Meds = 0; 
        C_Smoker = 7.837; 
        C_Age_Smoker = -1.795; 
        C_Diabetes = 0.658; 
        S10 = 0.9144; 
        Mean_Terms = 61.18;
      };
    }

    var Age = parseFloat(this.data.age) * parseFloat(this.data.ageunit);
    console.log("age(year) num is " + Age);

    var Total_Cholesterol = parseFloat(this.data.totalchol) * parseFloat(this.data.cholunit);
    console.log("totalchol(mg/dL) num is " + Total_Cholesterol);

    var HDL_Cholesterol = parseFloat(this.data.hdlchol) * parseFloat(this.data.hdlcholunit);
    console.log("hdlchol(mg/dL) num is " + HDL_Cholesterol);

    var Systolic_Blood_Pressure = parseFloat(this.data.bloodpressure) * parseFloat(this.data.bloodpresunit);
    console.log("bloodpressure(mmHg) num is " + Systolic_Blood_Pressure);

    var On_Hypertension_Med = parseFloat(this.data.hypertensionvalue);
    var Diabetes = parseFloat(this.data.diabetesvalue);
    var Smoker = parseFloat(this.data.smokevalue);

    var dp = parseFloat(this.data.DecptsArray[this.data.decptsindex].value);
    console.log("dp num is " + dp);

    var Terms = (C_Age * ln(Age)) + (C_Sq_Age * sq(ln(Age))) + (C_Total_Chol * ln(Total_Cholesterol)) + (C_Age_Total_Chol * ln(Age) * ln(Total_Cholesterol)) + (C_HDL_Chol * ln(HDL_Cholesterol)) + (C_Age_HDL_Chol * ln(Age) * ln(HDL_Cholesterol)) + (On_Hypertension_Med * C_On_Hypertension_Meds * ln(Systolic_Blood_Pressure)) + (On_Hypertension_Med * C_Age_On_Hypertension_Meds * ln(Age) * ln(Systolic_Blood_Pressure)) + (!On_Hypertension_Med * C_Off_Hypertension_Meds * ln(Systolic_Blood_Pressure)) + (!On_Hypertension_Med * C_Age_Off_Hypertension_Meds * ln(Age) * ln(Systolic_Blood_Pressure)) + (C_Smoker * Smoker) + (C_Age_Smoker * ln(Age) * Smoker) + (C_Diabetes * Diabetes);

    var Ten_Year_Risk = 100 * (1 - power(S10, eTo(Terms - Mean_Terms)));

    var result = fixDP((Ten_Year_Risk), dp);

    this.setData({
      tenyearrisk: result,
    })

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
          wx.setStorageSync("refresh_token","");
          wx.setStorageSync("islogin",0);
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
        if(res.data == 0){
          that.setData({
            iconurl: "../../images/useravatar.png",
            loginstatus: 0,
          });
        }else{
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