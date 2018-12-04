
function alerterror(errormsg) {
  wx.showToast({
    title: errormsg,
    icon: "none",
    duration: 1500,
  });
}

module.exports.alerterror = alerterror;
