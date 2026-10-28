const store = require('../../utils/store.js')
const { toast, toastError } = require('../../utils/util.js')

Page({
  data: {
    userInfo: { avatarUrl: '', nickName: '' },
    works: [],
    loading: true,
    cloudMode: false
  },

  onLoad() {
    const saved = wx.getStorageSync('qc_user') || {}
    this.setData({
      userInfo: saved,
      cloudMode: store.isCloudMode()
    })
  },

  onShow() {
    this.loadList()
  },

  /** 拉取作品列表 */
  loadList() {
    store
      .listWorks()
      .then((list) => {
        this.setData({ works: list, loading: false })
      })
      .catch((err) => {
        this.setData({ loading: false })
        toastError(err, '作品加载失败')
      })
  },

  onPullDownRefresh() {
    store
      .listWorks()
      .then((list) => {
        this.setData({ works: list, loading: false })
        wx.stopPullDownRefresh()
      })
      .catch((err) => {
        wx.stopPullDownRefresh()
        toastError(err, '刷新失败')
      })
  },

  /* ---------------- 我的 ---------------- */

  /** 选择头像（微信官方头像能力） */
  onChooseAvatar(e) {
    const tempPath = e.detail.avatarUrl
    if (!tempPath) return
    // 临时文件重启后会失效，这里转存为持久化文件路径
    wx.getFileSystemManager().saveFile({
      tempFilePath: tempPath,
      success: (res) => this.saveUser({ avatarUrl: res.savedFilePath }),
      fail: () => this.saveUser({ avatarUrl: tempPath })
    })
  },

  /** 填写昵称 */
  onNicknameInput(e) {
    this.saveUser({ nickName: (e.detail.value || '').trim() })
  },

  saveUser(patch) {
    const userInfo = Object.assign({}, this.data.userInfo, patch)
    this.setData({ userInfo: userInfo })
    wx.setStorageSync('qc_user', userInfo)
  },

  /* ---------------- 跳转 ---------------- */

  goAbout() {
    wx.navigateTo({ url: '/pages/about/about' })
  },

  goAdd() {
    wx.navigateTo({ url: '/pages/work-edit/work-edit' })
  },

  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: '/pages/work-detail/work-detail?id=' + id })
  },

  onShareAppMessage() {
    return {
      title: '青城拾色 · 我的茶染作品',
      path: '/pages/works/works'
    }
  }
})
