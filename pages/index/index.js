const { HOME_BANNER, HOME_BANNER_VIDEO, FOUR_COLORS } = require('../../utils/assets.js')

Page({
  data: {
    banner: HOME_BANNER,
    bannerVideo: HOME_BANNER_VIDEO,
    bannerError: false,
    videoError: false,
    colors: FOUR_COLORS,
    activeIndex: -1
  },

  /** 回到首页时恢复横幅视频（静音循环播放） */
  onShow() {
    if (this.data.bannerVideo && !this.data.videoError) {
      wx.createVideoContext('homeVideo', this).play()
    }
  },

  /** 切到其他 tab 时暂停，避免后台继续解码耗电 */
  onHide() {
    if (this.data.bannerVideo && !this.data.videoError) {
      wx.createVideoContext('homeVideo', this).pause()
    }
  },

  /** 占位图加载失败时降级为色块 */
  onBannerError() {
    this.setData({ bannerError: true })
  },

  /** 视频加载失败时降级为横幅图 */
  onVideoError() {
    this.setData({ videoError: true })
  },

  /** 点色块：展开 / 收起该颜色的说明 */
  onToggleColor(e) {
    const index = Number(e.currentTarget.dataset.index)
    this.setData({
      activeIndex: this.data.activeIndex === index ? -1 : index
    })
  },

  goTutorial() {
    wx.switchTab({ url: '/pages/tutorial/tutorial' })
  },

  goRecipe() {
    wx.switchTab({ url: '/pages/recipe/recipe' })
  },

  goWorks() {
    wx.switchTab({ url: '/pages/works/works' })
  },

  onShareAppMessage() {
    return {
      title: '青城拾色 · 一叶一染｜茶染小助手',
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return { title: '青城拾色 · 一叶一染｜茶染小助手' }
  }
})
