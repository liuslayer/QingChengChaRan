// 云函数：把云存储文件 ID 换成可访问的临时地址
// 私有存储下，小程序端没有读权限，必须由云函数（管理端）来换
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event) => {
  const fileIDs = (event.fileIDs || []).filter(Boolean).slice(0, 50)
  if (!fileIDs.length) return { fileList: [] }

  const res = await cloud.getTempFileURL({ fileList: fileIDs })
  return { fileList: res.fileList || [] }
}
