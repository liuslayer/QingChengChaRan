const { CONTACT, ABOUT } = require('../../utils/config.js')
const { toast } = require('../../utils/util.js')

Page({
  data: {
    contact: CONTACT,
    about: ABOUT
  },

  /** 拨打电话 */
  onCall() {
    wx.makePhoneCall({
      phoneNumber: CONTACT.phone,
      fail() {
        toast('拨号已取消')
      }
    })
  },

  /** 复制微信号 */
  onCopyWechat() {
    wx.setClipboardData({
      data: CONTACT.wechat,
      success() {
        wx.showToast({ title: '微信号已复制', icon: 'none' })
      }
    })
  },

  /** 复制地址 */
  onCopyAddress() {
    wx.setClipboardData({
      data: CONTACT.address,
      success() {
        wx.showToast({ title: '地址已复制', icon: 'none' })
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '青城拾色 · 一叶一染｜茶染小助手',
      path: '/pages/index/index'
    }
  }
})
