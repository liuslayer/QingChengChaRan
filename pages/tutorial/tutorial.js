const { MAIN_VIDEO, STEPS } = require('../../utils/tutorialData.js')

Page({
  data: {
    mainVideo: MAIN_VIDEO,
    steps: STEPS
  },

  /** 播放步骤视频时先暂停主视频，避免两路声音同时响 */
  onStepVideoPlay() {
    wx.createVideoContext('mainVideo', this).pause()
  },

  onShareAppMessage() {
    return {
      title: '青城茶染教程 · 五步染出青城色',
      path: '/pages/tutorial/tutorial'
    }
  }
})
