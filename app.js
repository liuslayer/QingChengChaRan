// 青城拾色 · 茶染小助手 —— 小程序入口
const { CLOUD_ENV } = require('./utils/config.js')

App({
  globalData: {
    // 当前是否运行在云开发模式（由 utils/config.js 的 CLOUD_ENV 自动决定）
    useCloud: false
  },

  onLaunch() {
    if (!CLOUD_ENV) {
      // 未填写云环境 ID：使用本地存储模式，功能完全一致，作品保存在手机本地
      console.warn(
        '[青城拾色] 未配置云开发环境 ID，已启用本地存储模式。' +
          '请在 utils/config.js 中填写 CLOUD_ENV 后重新编译。'
      )
      return
    }

    if (!wx.cloud) {
      console.error('[青城拾色] 当前基础库版本过低，无法使用云开发，请升级基础库至 2.2.3 以上')
      return
    }

    wx.cloud.init({
      env: CLOUD_ENV,
      traceUser: true
    })
    this.globalData.useCloud = true
    console.log('[青城拾色] 云开发模式已启用，环境：', CLOUD_ENV)
  }
})
