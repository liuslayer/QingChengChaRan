const store = require('../../utils/store.js')
const { toast, toastError } = require('../../utils/util.js')

Page({
  data: {
    id: '',
    work: null,
    shareImage: '',
    loading: true
  },

  onLoad(options) {
    this.setData({ id: (options && options.id) || '' })
    this.loadWork()
  },

  onShow() {
    // 首次进入不重复加载；从编辑页返回时刷新
    if (this.firstShowDone) {
      this.loadWork()
    }
    this.firstShowDone = true
  },

  loadWork() {
    const id = this.data.id
    if (!id) {
      this.setData({ loading: false })
      toast('作品不存在')
      setTimeout(() => wx.navigateBack(), 800)
      return
    }

    store
      .getWork(id)
      .then((work) => {
        if (!work) {
          this.setData({ loading: false })
          toast('作品不存在或已被删除')
          setTimeout(() => wx.navigateBack(), 900)
          return
        }
        this.setData({ work: work, loading: false })
        // 云存储图片转成临时链接，供分享卡片使用
        return store.getDisplayUrl(work.imageFileID).then((url) => {
          this.setData({ shareImage: url })
        })
      })
      .catch((err) => {
        this.setData({ loading: false })
        toastError(err, '加载失败')
      })
  },

  /** 全屏看图 */
  onPreviewImage() {
    const work = this.data.work
    if (!work || !work.imageFileID) return
    wx.previewImage({
      current: work.imageFileID,
      urls: [work.imageFileID]
    })
  },

  goEdit() {
    wx.navigateTo({ url: '/pages/work-edit/work-edit?id=' + this.data.id })
  },

  onShareAppMessage() {
    const work = this.data.work || {}
    const imageUrl = this.data.shareImage || work.imageFileID || ''

    if (this.data.id) {
      return {
        title: work.name ? '我的茶染作品：' + work.name : '青城拾色 · 茶染作品',
        path: '/pages/work-detail/work-detail?id=' + this.data.id,
        imageUrl: imageUrl && imageUrl.indexOf('cloud://') === 0 ? '' : imageUrl
      }
    }
    return {
      title: '青城拾色 · 一叶一染',
      path: '/pages/index/index'
    }
  }
})
