const store = require('../../utils/store.js')
const { INGREDIENTS } = require('../../utils/recipeData.js')
const { today, toast, toastError } = require('../../utils/util.js')

Page({
  data: {
    isEdit: false,
    id: '',
    ingredients: INGREDIENTS,
    ingredientIndex: 0,
    form: {
      name: '',
      imageFileID: '',
      ingredient: INGREDIENTS[0],
      recipe: '',
      date: '',
      note: ''
    },
    pendingImage: '', // 新选的本地图片路径（尚未上传到云存储）
    maxDate: '',
    submitting: false
  },

  onLoad(options) {
    this.setData({ maxDate: today() })

    if (options && options.id) {
      this.setData({ isEdit: true, id: options.id, 'form.date': today() })
      wx.setNavigationBarTitle({ title: '编辑作品' })
      this.loadWork(options.id)
    } else {
      this.setData({ 'form.date': today() })
      wx.setNavigationBarTitle({ title: '新增作品' })
    }
  },

  /** 编辑模式：回填作品数据 */
  loadWork(id) {
    store
      .getWork(id)
      .then((work) => {
        if (!work) {
          toast('作品不存在或已被删除')
          setTimeout(() => wx.navigateBack(), 900)
          return
        }
        const idx = INGREDIENTS.indexOf(work.ingredient)
        this.setData({
          form: {
            name: work.name || '',
            imageFileID: work.imageFileID || '',
            ingredient: work.ingredient || INGREDIENTS[0],
            recipe: work.recipe || '',
            date: work.date || today(),
            note: work.note || ''
          },
          ingredientIndex: idx < 0 ? 0 : idx
        })
      })
      .catch((err) => toastError(err, '作品加载失败'))
  },

  /* ---------------- 表单交互 ---------------- */

  /** 选择作品图片 */
  onChooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      sizeType: ['compressed'],
      success: (res) => {
        const file = res.tempFiles && res.tempFiles[0]
        if (file && file.tempFilePath) {
          this.setData({ pendingImage: file.tempFilePath })
        }
      },
      fail: (err) => {
        // 用户主动取消不提示
        if (err && err.errMsg && err.errMsg.indexOf('cancel') > -1) return
        toastError(err, '选择图片失败')
      }
    })
  },

  onInput(e) {
    const field = e.currentTarget.dataset.field
    const value = e.detail.value
    const patch = {}
    patch['form.' + field] = value
    this.setData(patch)
  },

  onIngredientChange(e) {
    const index = Number(e.detail.value)
    this.setData({
      ingredientIndex: index,
      'form.ingredient': this.data.ingredients[index]
    })
  },

  onDateChange(e) {
    this.setData({ 'form.date': e.detail.value })
  },

  /* ---------------- 保存 / 删除 ---------------- */

  onSave() {
    if (this.data.submitting) return

    const form = this.data.form
    const name = (form.name || '').trim()

    if (!name) {
      toast('请填写作品名')
      return
    }
    if (!form.imageFileID && !this.data.pendingImage) {
      toast('请先选择一张作品图片')
      return
    }
    if (!form.date) {
      toast('请选择制作日期')
      return
    }

    this.setData({ submitting: true })
    wx.showLoading({ title: '保存中', mask: true })

    const uploadTask = this.data.pendingImage
      ? store.uploadImage(this.data.pendingImage)
      : Promise.resolve(form.imageFileID)

    uploadTask
      .then((imageFileID) => {
        const payload = {
          name: name,
          imageFileID: imageFileID,
          ingredient: form.ingredient,
          recipe: (form.recipe || '').trim(),
          date: form.date,
          note: (form.note || '').trim()
        }
        return this.data.isEdit
          ? store.updateWork(this.data.id, payload)
          : store.addWork(payload)
      })
      .then(() => {
        wx.hideLoading()
        wx.showToast({
          title: this.data.isEdit ? '已保存' : '添加成功',
          icon: 'success'
        })
        setTimeout(() => wx.navigateBack(), 900)
      })
      .catch((err) => {
        wx.hideLoading()
        this.setData({ submitting: false })
        toastError(err, '保存失败，请重试')
      })
  },

  onDelete() {
    const that = this
    wx.showModal({
      title: '删除作品',
      content: '删除后无法恢复，确定要删除吗？',
      confirmText: '删除',
      confirmColor: '#B5714A',
      success(res) {
        if (!res.confirm) return
        wx.showLoading({ title: '删除中', mask: true })
        store
          .removeWork(that.data.id)
          .then(() => {
            wx.hideLoading()
            toast('已删除')
            setTimeout(() => wx.navigateBack(), 800)
          })
          .catch((err) => {
            wx.hideLoading()
            toastError(err, '删除失败')
          })
      }
    })
  }
})
