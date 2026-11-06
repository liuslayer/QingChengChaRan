const { MAIN_VIDEO, STEPS } = require('../../utils/tutorialData.js')

Page({
  data: {
    mainVideo: MAIN_VIDEO,
    steps: STEPS
  },

  onLoad() {
    this.resolveCloudVideos()
  },

  /** 云存储文件 ID（cloud:// 开头）不能直接播放，先换成临时地址 */
  resolveCloudVideos() {
    const cloudIds = [MAIN_VIDEO.src]
      .concat(STEPS.map((s) => s.video))
      .filter((u) => u && u.indexOf('cloud://') === 0)

    if (!cloudIds.length) return
    if (!wx.cloud) {
      console.error('[青城拾色] 当前基础库过低，无法使用云开发')
      return
    }

    this.getTempUrls(cloudIds)
      .then((map) => this.applyVideoUrls(map))
      .catch((err) => {
        console.error('[青城拾色] 教程视频地址解析失败：', err)
      })
  },

  /**
   * 私有存储下，小程序端没有读权限，必须由云函数（管理端）换地址。
   * 云函数尚未部署时退回前端接口，兼容公有读的情况。
   */
  getTempUrls(cloudIds) {
    return wx.cloud
      .callFunction({ name: 'getVideoUrls', data: { fileIDs: cloudIds } })
      .then((res) => this.toUrlMap((res.result && res.result.fileList) || []))
      .catch((err) => {
        console.warn(
          '[青城拾色] 云函数 getVideoUrls 不可用，改用前端接口：',
          (err && (err.errMsg || err.message)) || err
        )
        return wx.cloud
          .getTempFileURL({ fileList: cloudIds })
          .then((res) => this.toUrlMap(res.fileList || []))
      })
  },

  toUrlMap(fileList) {
    const map = {}
    fileList.forEach((f) => {
      if (f.tempFileURL) {
        map[f.fileID] = f.tempFileURL
      } else {
        console.error(
          '[青城拾色] 视频地址解析失败：',
          f.fileID,
          'status =',
          f.status,
          f.errMsg || ''
        )
      }
    })

    if (!Object.keys(map).length) {
      console.error(
        '[青城拾色] 没有任何视频地址可用，请确认云函数 getVideoUrls 已上传并部署'
      )
    }
    return map
  },

  applyVideoUrls(map) {
    this.setData({
      mainVideo: Object.assign({}, MAIN_VIDEO, {
        src: map[MAIN_VIDEO.src] || MAIN_VIDEO.src
      }),
      steps: STEPS.map((s) =>
        Object.assign({}, s, { video: map[s.video] || s.video })
      )
    })
  },

  /** 播放步骤视频时先暂停主视频，避免两路声音同时响 */
  onStepVideoPlay() {
    wx.createVideoContext('mainVideo', this).pause()
  },

  onShareAppMessage() {
    return {
      title: '青城茶染教程 · 四步染出青城色',
      path: '/pages/tutorial/tutorial'
    }
  }
})
