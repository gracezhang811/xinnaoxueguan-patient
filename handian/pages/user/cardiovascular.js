// pages/user/cardiovascular .js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RaceArray:[
    { name: "黑人或非裔美国人", value: "0" , checked: false},
      { name: "白人", value: "1", checked: false },
      { name: "其他人种", value: "1", checked: false },
    ],
    SexArray: [
      { name: "男", value: "Male", checked: false },
      { name: "女", value: "Female", checked: false },
    ], 
    AgeUnitArray: [
      { name: "年", value: "1|0|yr"},
      { name: "月", value: "0.0833333333333333|0|mo" },
    ],
    TotalCholArray: [
      { name: "mg/dL 毫克/分升", value: "1|0|mg/dL_Chol" },
      { name: "mmol/L 毫摩尔/升", value: "38.6697602474865|0|mmol/L_Chol" },
    ],
    HDLCholArray: [
      { name: "mg/dL 毫克/分升", value: "1|0|mg/dL_Chol" },
      { name: "mmol/L 毫摩尔/升", value: "38.6697602474865|0|mmol/L_Chol" },
    ],
    BloodPressureArray:[
      { name: "Pascal 帕斯卡", value: "0.00750063755419211|0|Pascal" },
      { name: "atm", value: "760.002100178515|0|atm" },
      { name: "bar", value: "750.063755419211|0|bar" },
      { name: "cmH2O", value: "0.735561538478802|0|cmH2O" },
      { name: "cmHg", value: "10|0|cmHg" },
      { name: "ftH2O", value: "22.4199156928339|0|ftH2O" },
      { name: "gm/sqcm", value: "0.735561538478802|0|gm/sqcm" },
      { name: "inH2O", value: "1.86832630773616|0|inH2O" },
      { name: "inHg", value: "25.4000840071406|0|inHg" },
      { name: "kPa 千帕", value: "7.50063755419211|0|kPa" },
      { name: "mbar", value: "0.750063755419211|0|mbar" },
      { name: "mmHg 毫米汞柱", value: "1|0|mmHg" },
      { name: "psi", value: "51.7150957831416|0|psi" },
      { name: "torr", value: "1|0|torr" },
    ],
    HypertensionArray: [
      { name: "否", value: "No|0", checked: false },
      { name: "是", value: "Yes|1", checked: false },
    ], 
    DiabetesArray: [
      { name: "否", value: "No|0", checked: false },
      { name: "是", value: "Yes|1", checked: false },
    ], 
    SmokeArray: [
      { name: "否", value: "No|0", checked: false },
      { name: "是", value: "Yes|1", checked: false },
    ],    
    DecptsArray: [
      { name: "1" },
      { name: "2"},
      { name: "3" },
    ],
    TenYearRiskArray: [
      { name: "%", value: "1|0|%" },
      { name: "fraction", value: "100|0|fraction" },
      { name: "percent", value: "1|0|percent" },
      { name: "rate", value: "100|0|rate" },
      { name: "ratio", value: "100|0|ratio" },
    ],           
    ageunitindex: 0,
    cholunitindex: 0,
    hdlcholunitindex: 0,
    bloodpresunitindex: 11,
    decptsindex: 1,
    tenyearriskunitindex:0,
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      ageunitindex: e.detail.value
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