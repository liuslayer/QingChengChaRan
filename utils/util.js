/** 通用小工具 */

function pad(n) {
  return n < 10 ? '0' + n : '' + n
}

/** 把 Date / 时间戳 格式化为 YYYY-MM-DD */
function formatDate(date) {
  const d = date instanceof Date ? date : new Date(date)
  if (isNaN(d.getTime())) return ''
  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
}

/** 今天的日期字符串 YYYY-MM-DD */
function today() {
  return formatDate(new Date())
}

/** 把列表里的 createTime 时间戳格式化为 YYYY-MM-DD HH:mm */
function formatDateTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  if (isNaN(d.getTime())) return ''
  return formatDate(d) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes())
}

/** 生成一个短随机串，用于云存储文件名 */
function randomString(len) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let s = ''
  for (let i = 0; i < (len || 6); i++) {
    s += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return s
}

/** wx.showToast 的 promise 化简写 */
function toast(title, icon) {
  wx.showToast({ title: title, icon: icon || 'none', duration: 1800 })
}

/** 统一的错误提示 */
function toastError(err, fallback) {
  console.error(err)
  const msg =
    (err && (err.errMsg || err.message)) || fallback || '操作失败，请重试'
  wx.showToast({ title: msg, icon: 'none', duration: 2000 })
}

module.exports = {
  formatDate,
  formatDateTime,
  today,
  randomString,
  toast,
  toastError
}
