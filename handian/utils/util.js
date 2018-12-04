const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formaturl = (str, argArray) => {
  if (typeof argArray !== "object") {
    return str;
  }
  for (var i = 0; i < argArray.length; i++) {
    str = str.replace("{" + i + "}", argArray[i]);
  }
  return str;
}

module.exports = {
  formatTime: formatTime,
  formatNumber:formatNumber,
  formaturl: formaturl,
}

